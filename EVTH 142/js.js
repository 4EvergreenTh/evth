const datasets = [
  {id:'floppy', title:'3.5" Floppy — Sector Dump', type:'rom', locked:false, desc:'Local floppy IMG.', file:'media/floppy.img', size:'1.44 MB'},
  {id:'cartridge', title:'Game Cartridge — ROM dump', type:'rom', locked:false, desc:'Local cartridge ROM.', file:'media/cartridge.gbc', size:'64 KB'},
  {id:'tape', title:'Reel Tape — Audio capture', type:'audio', locked:false, desc:'Local audio capture.', file:'media/tape.mp3', size:'2.1 MB'},
  {id:'image1', title:'Sample Image', type:'image', locked:false, desc:'Example image preview.', file:'media/sample.png', size:'512 KB'}
];

const CORRECT_TOKEN = 'S15-R16-U20';

const entry = document.getElementById('entry');
const app = document.getElementById('app');
const openBtn = document.getElementById('open');
const seed = document.getElementById('seed');
const entrymsg = document.getElementById('entrymsg');

const listEl = document.getElementById('list');
const content = document.getElementById('content');
const details = document.getElementById('details');
const vtitle = document.getElementById('vtitle');

let selected = null;

// Render left sidebar
function renderList(){
  listEl.innerHTML='';
  for(const ds of datasets){
    const div=document.createElement('div');
    div.className='item'+(ds.locked?' locked':'');
    div.textContent=ds.title;
    div.onclick=()=>select(ds.id);
    listEl.appendChild(div);
  }
}

// Select an item
function select(id){
  selected = datasets.find(d=>d.id===id);
  vtitle.textContent = selected.title;

  // Right sidebar: metadata
  details.innerHTML = `
    <div style="font-weight:700">${selected.title}</div>
    <div class="small" style="margin-top:6px">${selected.desc}</div>
    <div class="small" style="margin-top:6px">File: ${selected.file}</div>
    <div class="small">Size: ${selected.size}</div>
    <div class="small">Type: ${selected.type.toUpperCase()}</div>
  `;

  // Center column preview
  if(selected.type === 'audio'){
    content.innerHTML = `<audio controls src="${selected.file}" style="width:100%"></audio>`;
  } else if(selected.type === 'image'){
    content.innerHTML = `<img src="${selected.file}" style="max-width:100%; max-height:400px; display:block; margin:auto" />`;
  } else { // ROM / binary preview
    content.innerHTML = `<div class="small" style="text-align:center; margin-top:50px">Preview unavailable for this file type.</div>`;
  }
}

// Access button
openBtn.onclick = () => {
  if(seed.value.trim()===CORRECT_TOKEN){
    entry.style.display='none';
    app.style.display='block';
    renderList();
  } else {
    entrymsg.innerHTML='<span class="flash">ACCESS REVOKED</span>';
  }
};

seed.addEventListener('keydown',(e)=>{if(e.key==='Enter') openBtn.click();});
