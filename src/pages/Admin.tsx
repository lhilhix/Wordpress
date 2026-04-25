import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../lib/firebase";
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
import { Plus, Edit2, Trash2, LogOut, Package, Settings, Layout, Info, Image as ImageIcon, X } from "lucide-react";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../components/ConfirmationModal";

type AdminTab = "products" | "settings";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
    logoUrl: "",
    contactEmail: "geral@bueso.pt",
    contactPhone: "+351 253 695 164",
    address: "R. António Alberto de Sousa 38 Pav.2, 4705-132 Braga, Portugal",
    aboutText: "Fundada com a missão de transformar materiais, a Plásticos Bueso é sinónimo de inovação na indústria de plásticos. Com anos de experiência, a nossa jornada é marcada pela qualidade e pela procura constante por soluções eficientes. O nosso compromisso com a sustentabilidade e a resiliência reflete-se em cada etapa do nosso processo produtivo.",
    aboutImage: "",
    servicesIntro: "Especializamo-nos em soluções inovadoras para a indústria de transformação de plásticos. Os nossos serviços abrangem injeção, cromagem e metalização a vácuo, respondendo aos mais altos padrões de exigência do setor automóvel, médico e eletrónico.",
    metaTitle: "Plásticos Bueso | Inovação em Moldagem por Injeção",
    metaDescription: "Especialistas em injeção de plásticos, cromagem e metalização a vácuo para as indústrias automóvel, médica e eletrónica.",
    metaKeywords: "injeção de plásticos, moldagem, metalização vácuo, braga, portugal",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'firestoreId'>>({
    id: "",
    name: "",
    category: "Engrenagens",
    industry: "Automóvel",
    description: "",
    image: "https://picsum.photos/seed/default/600/600",
    images: [],
    detailedDescription: "",
    specifications: "",
    isFeatured: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingImage(true);
      const uploadPromises = Array.from(files).map(async (file: File) => {
        const storageRef = ref(storage, 'imagens/prodrucimages/' + Date.now() + '_' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => {
        const currentImages = prev.images || [];
        const newImages = [...currentImages, ...uploadedUrls];
        return { 
          ...prev, 
          image: prev.image.includes('picsum') && newImages.length > 0 ? newImages[0] : prev.image,
          images: newImages 
        };
      });
      setUploadingImage(false);
    } catch (error) {
      console.error("Error during multiple upload", error);
      alert("Erro ao carregar algumas imagens.");
      setUploadingImage(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => {
      const newImages = (prev.images || []).filter((_, index) => index !== indexToRemove);
      return {
        ...prev,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : "https://picsum.photos/seed/default/600/600"
      };
    });
  };

  const handleSeedProducts = async () => {
    try {
      const staticProducts: Omit<Product, 'firestoreId'>[] = [
        { id: "PB-001", name: "Conjunto de Engrenagens de Precisão", category: "Engrenagens", industry: "Automóvel", description: "Engrenagens POM de alta durabilidade para sistemas de transmissão.", image: "https://picsum.photos/seed/gear/600/600", detailedDescription: "Produzidas com alta precisão e baixo atrito para máxima eficiência energética.", specifications: "Material: POM (Poliacetal)\nTolerância: ±0.01mm", isFeatured: true },
        { id: "PB-002", name: "Caixa Estéril", category: "Caixas", industry: "Médico", description: "Caixa de policarbonato de grau médico para dispositivos de diagnóstico.", image: "https://picsum.photos/seed/medical/600/600", detailedDescription: "Desenhado especificamente para aplicações médicas críticas e de diagnóstico rápido.", specifications: "Material: PC de Grau Médico\nEsterilizável: Sim (Autoclave, EtO)", isFeatured: true },
        { id: "PB-003", name: "Hub de Conectores", category: "Conectores", industry: "Eletrónica", description: "Conectores PA66 retardadores de chama para uso industrial.", image: "https://picsum.photos/seed/connector/600/600", detailedDescription: "Alta resistência a temperaturas exigentes em ambientes industriais de eletrónica de potência.", specifications: "Material: PA66\nÍndice de Retardamento: V-0 (UL94)", isFeatured: false },
        { id: "PB-004", name: "Acabamento de Painel", category: "Acabamentos", industry: "Automóvel", description: "Acabamento estético ABS/PC com acabamento soft-touch.", image: "https://picsum.photos/seed/trim/600/600", detailedDescription: "Moldagem de dois componentes de topo para viaturas elétricas do segmento premium.", specifications: "Material: ABS/PC\nRevestimento: TPE Soft-touch", isFeatured: true },
        { id: "PB-005", name: "Êmbolo de Seringa", category: "Componentes Precisão", industry: "Médico", description: "Êmbolos de PP de alta precisão para seringas médicas.", image: "https://picsum.photos/seed/syringe/600/600", detailedDescription: "Elevada reprodutibilidade num ambiente de sala limpa (ISO 7).", specifications: "Material: Polipropileno (PP)\nAmbiente: Sala Limpa Classe 10000", isFeatured: false },
        { id: "PB-006", name: "Caixa de Proteção", category: "Caixas", industry: "Bens de Consumo", description: "Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.", image: "https://picsum.photos/seed/case/600/600", detailedDescription: "Invólucro otimizado contra impactos mecânicos para eletrónica de consumo, garantindo durabilidade.", specifications: "Material: ABS Resistente ao Impacto\nResistência: IK08", isFeatured: false },
      ];
      for (const product of staticProducts) {
        await addProduct(product);
      }
      alert("Produtos adicionados com sucesso!");
    } catch (e) {
      console.error(e);
      alert("Erro ao adicionar: " + (e as Error).message);
    }
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
        category: "Engrenagens",
        industry: "Automóvel",
        description: "",
        image: "https://picsum.photos/seed/" + Math.random() + "/600/600",
        images: [],
        detailedDescription: "",
        specifications: "",
        isFeatured: false,
      });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Erro ao guardar produto: " + (err as Error).message);
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

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleSettingsImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'aboutImage' | 'logoUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      let setUploading;
      if (field === 'heroImage') setUploading = setUploadingHero;
      else if (field === 'aboutImage') setUploading = setUploadingAbout;
      else setUploading = setUploadingLogo;
      
      setUploading(true);
      const storageRef = ref(storage, `imagens/${field}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          setUploading(false);
          alert("Erro no upload.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setSettings(prev => ({ ...prev, [field]: downloadURL }));
          setUploading(false);
        }
      );
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.firestoreId!);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      industry: product.industry,
      description: product.description,
      image: product.images && product.images.length > 0 ? product.images[0] : product.image,
      images: product.images || (product.image ? [product.image] : []),
      detailedDescription: product.detailedDescription || "",
      specifications: product.specifications || "",
      isFeatured: product.isFeatured || false,
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
                    <label className="micro-label">Categoria (Tipo de Peça)</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none bg-white"
                    >
                      <option>Engrenagens</option>
                      <option>Conectores</option>
                      <option>Caixas</option>
                      <option>Acabamentos</option>
                      <option>Componentes Precisão</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Indústria / Setor</label>
                    <select 
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
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
                    <label className="micro-label">Imagens do Produto (Pode adicionar várias)</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={formData.image || ""}
                          onChange={(e) => {
                            const url = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              image: url,
                              images: prev.images && prev.images.length > 0 
                                ? [url, ...prev.images.slice(1)] 
                                : [url]
                            }));
                          }}
                          className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                          id="product-image-upload"
                        />
                        <label 
                          htmlFor="product-image-upload"
                          className="p-3 bg-industrial-gray text-industrial-black cursor-pointer hover:bg-industrial-black hover:text-white transition-all block"
                        >
                          <ImageIcon size={18} />
                        </label>
                      </div>
                      {uploadingImage && <span className="text-sm text-bfi-red font-medium animate-pulse whitespace-nowrap">A carregar...</span>}
                    </div>
                    {/* Image Gallery Preview */}
                    {formData.images && formData.images.length > 0 ? (
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group w-full aspect-square bg-industrial-gray">
                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-bfi-red text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      formData.image && formData.image.startsWith('http') && !formData.image.includes('picsum') && (
                         <div className="mt-2 text-xs text-industrial-black/50 overflow-hidden text-ellipsis whitespace-nowrap">
                           URL: {formData.image}
                         </div>
                      )
                    )}
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
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured || false}
                        onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                        className="w-5 h-5 accent-bfi-red"
                      />
                      <label htmlFor="isFeatured" className="micro-label cursor-pointer text-industrial-black">
                        Destaque na Página Inicial (Aparece no Carrossel)
                      </label>
                    </div>

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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black uppercase flex items-center gap-2">
                    <Package size={20} /> Produtos Existentes ({products.length})
                  </h2>
                  <button 
                    onClick={handleSeedProducts}
                    className="micro-label text-bfi-red border border-bfi-red/20 px-3 py-1 hover:bg-bfi-red hover:text-white transition-colors"
                  >
                    Carregar Exemplos
                  </button>
                </div>
                
                <div className="divide-y divide-industrial-black/5">
                  {products.length === 0 && (
                    <p className="py-12 text-center text-industrial-black/30 micro-label">Nenhum produto encontrado.</p>
                  )}
                  {(() => {
                    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
                    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
                    const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

                    return (
                      <>
                        {paginatedProducts.map((product) => (
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
                                <span className="micro-label opacity-40 ml-2">| {product.industry}</span>
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

                        {totalPages > 1 && (
                          <div className="mt-8 flex justify-center items-center gap-2">
                            <button
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              className="px-4 py-2 border border-industrial-black/10 micro-label hover:bg-industrial-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-industrial-black"
                            >
                              Anterior
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 micro-label font-bold transition-all ${currentPage === page ? 'bg-bfi-red text-white' : 'border border-industrial-black/10 hover:bg-industrial-gray'}`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              className="px-4 py-2 border border-industrial-black/10 micro-label hover:bg-industrial-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-industrial-black"
                            >
                              Próximo
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
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
                  <label className="micro-label">Imagem Hero (Início)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        value={settings.heroImage || ""}
                        onChange={(e) => setSettings({...settings, heroImage: e.target.value})}
                        className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleSettingsImageUpload(e, 'heroImage')}
                        className="hidden"
                        id="hero-upload"
                      />
                      <label 
                        htmlFor="hero-upload"
                        className="p-3 bg-industrial-gray text-industrial-black cursor-pointer hover:bg-industrial-black hover:text-white transition-all block"
                      >
                        <ImageIcon size={18} />
                      </label>
                    </div>
                  </div>
                  {uploadingHero && <span className="text-xs text-bfi-red animate-pulse">A carregar...</span>}
                  {settings.heroImage && (
                    <div className="mt-2 w-full aspect-video bg-industrial-gray overflow-hidden">
                      <img src={settings.heroImage} alt="Hero Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Logótipo (Navbar/Footer)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        value={settings.logoUrl || ""}
                        onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                        className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleSettingsImageUpload(e, 'logoUrl')}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="p-3 bg-industrial-gray text-industrial-black cursor-pointer hover:bg-industrial-black hover:text-white transition-all block"
                      >
                        <ImageIcon size={18} />
                      </label>
                    </div>
                  </div>
                  {uploadingLogo && <span className="text-xs text-bfi-red animate-pulse">A carregar...</span>}
                  {settings.logoUrl && (
                    <div className="mt-2 h-12 bg-industrial-gray p-2 flex items-center justify-start overflow-hidden">
                      <img src={settings.logoUrl} alt="Logo Preview" className="h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  )}
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
            <div className="space-y-12">
              <div className="bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <h2 className="text-xl font-black uppercase">Sobre Nós & Serviços</h2>
                </div>
                
                <form onSubmit={handleSettingsSubmit} className="space-y-6">
                  {/* ... same as before but wrapped ... */}
                  <div className="space-y-2">
                    <label className="micro-label">Texto "Sobre Nós"</label>
                    <textarea 
                      value={settings.aboutText || ""}
                      onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
                      className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[120px] resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Imagem "Sobre Nós"</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={settings.aboutImage || ""}
                          onChange={(e) => setSettings({...settings, aboutImage: e.target.value})}
                          className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleSettingsImageUpload(e, 'aboutImage')}
                          className="hidden"
                          id="about-upload"
                        />
                        <label 
                          htmlFor="about-upload"
                          className="p-3 bg-industrial-gray text-industrial-black cursor-pointer hover:bg-industrial-black hover:text-white transition-all block"
                        >
                          <ImageIcon size={18} />
                        </label>
                      </div>
                    </div>
                    {uploadingAbout && <span className="text-xs text-bfi-red animate-pulse">A carregar...</span>}
                    {settings.aboutImage && (
                      <div className="mt-2 w-full aspect-square max-w-[200px] bg-industrial-gray overflow-hidden">
                        <img src={settings.aboutImage} alt="About Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
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

              {/* SEO Settings */}
              <div className="bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center text-xs font-black">
                    SEO
                  </div>
                  <h2 className="text-xl font-black uppercase">Otimização (SEO)</h2>
                </div>
                
                <form onSubmit={handleSettingsSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="micro-label">Título do Site (Meta Title)</label>
                    <input 
                      type="text" 
                      value={settings.metaTitle || ""}
                      onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Descrição (Meta Description)</label>
                    <textarea 
                      value={settings.metaDescription || ""}
                      onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                      className="w-full border border-industrial-black/10 p-3 focus:border-bfi-red outline-none min-h-[80px] resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Palavras-Chave (Meta Keywords)</label>
                    <input 
                      type="text" 
                      value={settings.metaKeywords || ""}
                      onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                      className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                      placeholder="injecção, plásticos, moldes..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all">
                    Guardar SEO
                  </button>
                </form>
              </div>
            </div>

            {/* AI AppSettings */}
            <div className="bg-white p-8 shadow-xl lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center">
                  <span className="font-black">AI</span>
                </div>
                <h2 className="text-xl font-black uppercase">Configurações Chat IA</h2>
              </div>
              
              <form onSubmit={handleSettingsSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="micro-label">Fornecedor (Provider)*</label>
                  <select 
                    value={settings.chatProvider || "google"}
                    onChange={(e) => setSettings({...settings, chatProvider: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none bg-transparent"
                  >
                    <option value="google">Google Gemini (GenAI SDK)</option>
                    <option value="openai">OpenAI Compatível (Fetch)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Modelo</label>
                  <input 
                    type="text" 
                    value={settings.chatModel || ""}
                    onChange={(e) => setSettings({...settings, chatModel: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="Ex: gemini-3-flash-preview ou gpt-4o-mini"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Chave API (Opcional se usar Env)</label>
                  <input 
                    type="password" 
                    value={settings.chatApiKey || ""}
                    onChange={(e) => setSettings({...settings, chatApiKey: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="sk-..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Endpoint (Para OpenAI Compatível)</label>
                  <input 
                    type="text" 
                    value={settings.chatEndpoint || ""}
                    onChange={(e) => setSettings({...settings, chatEndpoint: e.target.value})}
                    className="w-full border-b border-industrial-black/10 py-2 focus:border-bfi-red outline-none"
                    placeholder="https://api.openai.com/v1/chat/completions"
                  />
                </div>
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all">
                    Guardar Configurações IA
                  </button>
                </div>
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
