const datasets = [
  {id:'floppy',
    title:'3.5" Floppy — Sector Dump',
    type:'image', locked:false,
    desc:'Floppy IMG.',
    file:'media/floppy.png',
    size:'86.3 KB'},

  {id:'cartridge',
    title:'Gameboy Game — ROM dump',
    type:'rom',locked:false,
    desc:'Cartridge ROM.',
    file:'media/slowlyshrinkaway.gb',
    size:'64 KB'},

  {id:'tape',
    title:'Reel Tape — Audio capture',
    type:'audio', locked:false,
    desc:'Audio capture.',
    file:'media/tape.mp3',
    size:'2.1 MB'}
];

const CORRECT_TOKEN = 'S15R16U20';

const entry = document.getElementById('entry');
const app = document.getElementById('app');
const openBtn = document.getElementById('open');
const seed = document.getElementById('seed');
const entrymsg = document.getElementById('entrymsg');

const listEl = document.getElementById('list');
const content = document.getElementById('content');
const details = document.getElementById('details');
const vtitle = document.getElementById('vtitle');
const downloadBtn = document.getElementById('downloadBtn');

let selected = null;

// ------------------------------
// Render left sidebar
// ------------------------------
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

// ------------------------------
// Select dataset
// ------------------------------
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

  // Show download button if file exists
  if(selected.file){
    downloadBtn.style.display = 'inline-block';
  } else {
    downloadBtn.style.display = 'none';
  }
}

// ------------------------------
// Download button
// ------------------------------
downloadBtn.onclick = () => {
  if(!selected || !selected.file) return;
  const a = document.createElement('a');
  a.href = selected.file;
  a.download = selected.file.split('/').pop();
  a.click();
};

// ------------------------------
// Access button
// ------------------------------
openBtn.onclick = () => {
  if(seed.value.trim() === CORRECT_TOKEN){
    entry.style.display='none';
    app.style.display='block';
    renderList();
  } else {
    entrymsg.innerHTML='<span class="flash">ACCESS REVOKED</span>';
  }
};

seed.addEventListener('keydown',(e)=>{
  if(e.key==='Enter') openBtn.click();
});

// ------------------------------
// Auto-unlock previously entered token
// ------------------------------
if(localStorage.getItem('unit6a_unlocked')){
  for(const d of datasets) d.locked=false;
}
