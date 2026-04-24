import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

async function seed() {
  const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);

  const siteSettings = {
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
    contactEmail: "geral@bueso.pt",
    contactPhone: "+351 253 695 164",
    address: "R. António Alberto de Sousa 38 Pav.2, 4705-132 Braga, Portugal",
    aboutText: "Fundada com a missão de transformar materiais, a Plásticos Bueso é sinónimo de inovação na indústria de plásticos. Com anos de experiência, a nossa jornada é marcada pela qualidade e pela procura constante por soluções eficientes. O nosso compromisso com a sustentabilidade e a resiliência reflete-se em cada etapa do nosso processo produtivo.",
    servicesIntro: "Especializamo-nos em soluções inovadoras para a indústria de transformação de plásticos. Os nossos serviços abrangem injeção, cromagem e metalização a vácuo, respondendo aos mais altos padrões de exigência do setor automóvel, eletrónico e bens de consumo."
  };

  await setDoc(doc(db, "settings", "site"), siteSettings, { merge: true });

  const staticProducts = [
    { id: "PB-001", name: "Conjunto de Engrenagens de Precisão", category: "Engrenagens", industry: "Automóvel", description: "Engrenagens POM de alta durabilidade para sistemas de transmissão.", image: "https://picsum.photos/seed/gear/600/600", isFeatured: true, detailedDescription: "Produzidas com alta precisão e baixo atrito.", specifications: "Material: POM\nTolerância: +-0.01mm" },
    { id: "PB-002", name: "Caixa Estéril", category: "Caixas", industry: "Médico", description: "Caixa de policarbonato de grau médico para dispositivos de diagnóstico.", image: "https://picsum.photos/seed/medical/600/600", isFeatured: true, detailedDescription: "Esterilizável e resistente ao calor.", specifications: "Material: PC Médico\nEsterilização: Autoclave" },
    { id: "PB-003", name: "Hub de Conectores", category: "Conectores", industry: "Eletrónica", description: "Conectores PA66 retardadores de chama para uso industrial.", image: "https://picsum.photos/seed/connector/600/600", isFeatured: false, detailedDescription: "Resistentes a altas temperaturas e vibrações.", specifications: "Material: PA66\nRetardante: V-0" },
    { id: "PB-004", name: "Acabamento de Painel", category: "Acabamentos", industry: "Automóvel", description: "Acabamento estético ABS/PC com acabamento soft-touch.", image: "https://picsum.photos/seed/trim/600/600", isFeatured: true, detailedDescription: "Estética Premium com excelente durabilidade e resistência aos raios UV.", specifications: "Material: ABS/PC\nAcabamento: Soft-touch texturizado" },
    { id: "PB-005", name: "Êmbolo de Seringa", category: "Componentes Precisão", industry: "Médico", description: "Êmbolos de PP de alta precisão para seringas médicas.", image: "https://picsum.photos/seed/syringe/600/600", isFeatured: false, detailedDescription: "Produzido em ambiente de sala limpa, sem contaminações, e alta precisão dimensional.", specifications: "Material: PP Médico\nAmbiente: Sala Limpa ISO 7" },
    { id: "PB-006", name: "Caixa de Proteção", category: "Caixas", industry: "Bens de Consumo", description: "Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.", image: "https://picsum.photos/seed/case/600/600", isFeatured: false, detailedDescription: "Alta resistência a impactos diários e variações de temperatura, mantendo o apelo estético.", specifications: "Material: ABS\nImpacto: IK07" },
  ];

  for (const product of staticProducts) {
    await addDoc(collection(db, "products"), product);
  }

  console.log("Seeded database");
  process.exit(0);
}

seed().catch(console.error);
