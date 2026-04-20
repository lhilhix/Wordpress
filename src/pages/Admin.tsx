import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { 
  subscribeToProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  Product 
} from "../services/productService";
import { Plus, Edit2, Trash2, LogOut, Package } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
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

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleDelete = async (id: string) => {
    if (confirm("Tem a certeza que deseja eliminar este produto?")) {
      await deleteProduct(id);
    }
  };

  if (!user && !loading) return null;

  return (
    <div className="min-h-screen bg-industrial-gray flex flex-col">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-6 py-20 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="micro-label text-bfi-red mb-2">Painel de Controlo</div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Gestão de Catálogo</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 micro-label hover:text-bfi-red transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-xl sticky top-24">
              <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                {isEditing ? "Editar Produto" : "Adicionar Produto"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-2">
                  <label className="micro-label">Descrição Detalhada</label>
                  <textarea 
                    value={formData.detailedDescription || ""}
                    onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
                    className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="micro-label">Especificações Técnicas</label>
                  <textarea 
                    value={formData.specifications || ""}
                    onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                    className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[100px] resize-none"
                  />
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
                        onClick={() => handleDelete(product.firestoreId!)}
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
      </main>
    </div>
  );
}
