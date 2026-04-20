import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { 
  subscribeToProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  Product,
  subscribeToSiteSettings,
  updateSiteSettings,
  SiteSettings
} from "../services/productService";
import { Plus, Edit2, Trash2, LogOut, Package, Settings, Layout, Info, Image as ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../components/ConfirmationModal";

type AdminTab = "products" | "settings";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    heroImage: "",
    logoUrl: "",
    aboutText: "",
    aboutImage: "",
    servicesIntro: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'firestoreId'>>({
    id: "",
    name: "",
    category: "Automóvel",
    description: "",
    image: "https://picsum.photos/seed/default/600/600",
    detailedDescription: "",
    specifications: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    const unsubscribeProducts = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });

    const unsubscribeSettings = subscribeToSiteSettings((data) => {
      setSettings(data);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
      unsubscribeSettings();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(isEditing, formData);
        setIsEditing(null);
      } else {
        await addProduct(formData);
      }
      setFormData({
        id: "",
        name: "",
        category: "Automóvel",
        description: "",
        image: "https://picsum.photos/seed/" + Math.random() + "/600/600",
        detailedDescription: "",
        specifications: "",
      });
    } catch (err) {
      alert("Erro ao guardar produto.");
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteSettings(settings);
      alert("Configurações atualizadas com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar configurações.");
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.firestoreId!);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      detailedDescription: product.detailedDescription || "",
      specifications: product.specifications || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (isDeleting) {
      await deleteProduct(isDeleting);
      setIsDeleting(null);
    }
  };

  if (!user && !loading) return null;

  return (
    <div className="min-h-screen bg-industrial-gray flex flex-col">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <div className="micro-label text-bfi-red mb-2">Painel de Controlo</div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Administração</h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-3 micro-label transition-all ${activeTab === 'products' ? 'bg-industrial-black text-white' : 'border border-industrial-black/10 hover:bg-white'}`}
            >
              <Package size={16} /> Catálogo
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-6 py-3 micro-label transition-all ${activeTab === 'settings' ? 'bg-industrial-black text-white' : 'border border-industrial-black/10 hover:bg-white'}`}
            >
              <Settings size={16} /> Definições
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 micro-label text-bfi-red border border-bfi-red/10 hover:bg-bfi-red hover:text-white transition-all ml-auto md:ml-0"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {activeTab === "products" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 shadow-xl sticky top-24">
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                  {isEditing ? "Editar Produto" : "Adicionar Produto"}
                </h2>
                
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="micro-label">Referência (Ex: PB-001)</label>
                    <input 
                      required
                      type="text" 
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Nome do Produto</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Categoria</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none bg-white"
                    >
                      <option>Automóvel</option>
                      <option>Médico</option>
                      <option>Eletrónica</option>
                      <option>Industrial</option>
                      <option>Bens de Consumo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">URL da Imagem</label>
                    <input 
                      required
                      type="text" 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Descrição Curta</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-industrial-black/5">
                    <div className="space-y-2">
                      <label className="micro-label">Descrição Detalhada (Aparece no Modal)</label>
                      <textarea 
                        value={formData.detailedDescription || ""}
                        onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
                        className="w-full border border-industrial-black/10 p-4 focus:border-bfi-red outline-none min-h-[150px] resize-none text-sm leading-relaxed"
                        placeholder="Descreva o processo de fabrico, tolerâncias, materiais específicos..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="micro-label">Especificações Técnicas (Lista)</label>
                      <textarea 
                        value={formData.specifications || ""}
                        onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                        className="w-full border border-industrial-black/10 p-4 focus:border-bfi-red outline-none min-h-[100px] resize-none text-sm font-mono"
                        placeholder="Material: POM&#10;Tolerância: +/- 0.01mm&#10;Ciclo: 12s"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit"
                      className="flex-grow bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all"
                    >
                      {isEditing ? "Atualizar" : "Publicar"}
                    </button>
                    {isEditing && (
                      <button 
                        type="button"
                        onClick={() => setIsEditing(null)}
                        className="px-6 border border-industrial-black font-black uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 shadow-xl">
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Package size={20} /> Produtos Existentes ({products.length})
                </h2>
                
                <div className="divide-y divide-industrial-black/5">
                  {products.length === 0 && (
                    <p className="py-12 text-center text-industrial-black/30 micro-label">Nenhum produto encontrado.</p>
                  )}
                  {products.map((product) => (
                    <div key={product.firestoreId} className="py-6 flex gap-6 items-center group">
                      <div className="w-20 h-20 bg-industrial-gray overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-industrial-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-tighter">
                            {product.id}
                          </span>
                          <span className="micro-label text-bfi-red">{product.category}</span>
                        </div>
                        <h3 className="font-black uppercase tracking-tighter text-lg">{product.name}</h3>
                        <p className="text-sm text-industrial-black/50 line-clamp-1">{product.description}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-3 border border-industrial-black/10 hover:bg-industrial-gray text-industrial-black transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => setIsDeleting(product.firestoreId!)}
                          className="p-3 border border-industrial-black/10 hover:bg-bfi-red hover:text-white text-industrial-black transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Global Settings */}
            <div className="bg-white p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center">
                  <Layout size={20} />
                </div>
                <h2 className="text-xl font-black uppercase">Geral & Header</h2>
              </div>
              
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="micro-label">URL da Imagem Hero (Início)</label>
                  <input 
                    type="text" 
                    value={settings.heroImage || ""}
                    onChange={(e) => setSettings({...settings, heroImage: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">URL do Logótipo (Navbar/Footer)</label>
                  <input 
                    type="text" 
                    value={settings.logoUrl || ""}
                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Email de Contacto</label>
                  <input 
                    type="email" 
                    value={settings.contactEmail || ""}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Telefone</label>
                  <input 
                    type="text" 
                    value={settings.contactPhone || ""}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">URL do Catálogo Técnico (PDF)</label>
                  <input 
                    type="text" 
                    value={settings.techCatalogUrl || ""}
                    onChange={(e) => setSettings({...settings, techCatalogUrl: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" className="w-full bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all mt-4">
                  Guardar Alterações
                </button>
              </form>
            </div>

            {/* Content Settings */}
            <div className="bg-white p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h2 className="text-xl font-black uppercase">Sobre Nós & Serviços</h2>
              </div>
              
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="micro-label">Texto "Sobre Nós"</label>
                  <textarea 
                    value={settings.aboutText || ""}
                    onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
                    className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[120px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">URL Imagem "Sobre Nós"</label>
                  <input 
                    type="text" 
                    value={settings.aboutImage || ""}
                    onChange={(e) => setSettings({...settings, aboutImage: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Texto Introdução Serviços</label>
                  <textarea 
                    value={settings.servicesIntro || ""}
                    onChange={(e) => setSettings({...settings, servicesIntro: e.target.value})}
                    className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[80px] resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all mt-4">
                  Guardar Conteúdo
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <ConfirmationModal 
        isOpen={!!isDeleting}
        onClose={() => setIsDeleting(null)}
        onConfirm={confirmDelete}
        title="Eliminar Produto"
        message="Tem a certeza que deseja eliminar este produto? Esta ação não pode ser revertida."
      />
    </div>
  );
}
