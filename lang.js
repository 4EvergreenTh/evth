const translations = {
	
  en: {
    title: "EvthBound • Main Page",
	
	mainPage: "Main page",
	aboutMe: "About me",
	myProjects: "My projects",
	myPhotography: "My photography",
	myVideos: "My videos",
	
	links: "Links",
	mainPage2: "Main page",
	aboutMe2: "About me",
	myProjects2: "My projects",
	myPhotography2: "My photography",
	myVideos2: "My videos",
	
	socials: "Socials",
	insta: "My Instagram",
	spotify: "My Spotify",
	itch: "My Itch.io Page",
	
	welcome: "welcome to EvthBound.com !",
	switchLang: "Please Nintendo don't sue me, I just love Earthbound. Evth.com and EvergreenTh.com were already taken I couldn't do anything ya know. Oh and you can switch language in the menu by the way. just click on the EVTH logo !",
	soWhat: "SO WHAT ABOUT ME ?",
	descParagraph: "Heyo I'm <b>Tom.</b> I'm also known as <b>Evergreenth</b> online. I'm into <b>photography</b>, making <b>Game Boy games</b>, <b>music</b>, and just creating cool stuff for fun. I'm currently studying at a <b>cinema school</b>, which fits perfectly since I also enjoy <b>making videos</b>, and pretty much anything <b>creative</b>. When I'm not behind my camera, obsessing with niche image stuff, I like to try new things and jump between different <b><s>obsessions</s></b>, I mean- <b><u>hobbies</u></b> ... This website is just a little space for me to share what I'm up to. Hey it's cool to have a website don't you think ?", 
  },
  
  
  
  
  
  
  fr: {
	title: "EvthBound • Page Principale",
	
	mainPage: "Page principale",
	aboutMe: "À propos de moi",
	myProjects: "Mes projets",
	myPhotography: "Mes photos",
	myVideos: "Mes videos",
	
	links: "Liens",
	mainPage2: "Page principale",
	aboutMe2: "À propos de moi",
	myProjects2: "Mes projets",
	myPhotography2: "Mes photos",
	myVideos2: "Mes videos",
	
	socials: "Mes réseaux sociaux",
	insta: "Mon Instagram",
	spotify: "Mon Spotify",
	itch: "Ma page Itch.io",
	
    welcome: "Bienvenue sur EvthBound.com ! ",
	switchLang: "S’il vous plaît Nintendo, ne me poursuivez pas en justice, j’adore juste Earthbound. Evth.com et EvergreenTh.com étaient déjà pris, je pouvais rien faire vous savez. Ah, et vous pouvez changer la langue dans le menu d’ailleurs — cliquez juste sur le logo EVTH !",
	soWhat: "ALORS, QU’EST-CE QU’IL Y A À DIRE SUR MOI ?",
	descParagraph: "Heyo je suis <b>Tom.</b> Je suis aussi connu sous le nom de <b>Evergreenth</b> en ligne. Je suis passionné de <b>photographie</b>, je créer des <b>jeux Game Boy</b>, fais de la <b>musique</b>, et j’aime créer des trucs cools pour le fun. J’étudie actuellement dans une <b>école de cinéma</b>, ce qui est parfait pour moi vu que j’adore faire des <b>vidéos</b>, et à peu près tout ce qui est <b>créatif</b>. Quand je ne suis pas derrière ma caméra à m’obséder sur des trucs niche d’image, j’aime essayer de nouvelles choses et passer d’une <b><s>obsession</s></b> à une autre — enfin, je veux dire… des <b><u>passions</u></b>. Ce site est juste un petit espace pour partager ce que je fais. Eh, c’est quand même cool d’avoir un site, vous trouvez pas ?", 
  }
  
  
};










function setLang(lang) {
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.innerHTML = translations[lang][key];
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setLang('en');
});
