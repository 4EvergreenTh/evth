// ------------------------------
// Dataset definitions with local files
// ------------------------------
const datasets = [
  {id:'floppy', title:'3.5" Floppy — Sector Dump', type:'rom', locked:false, desc:'Local floppy IMG.', file:'media/floppy.png'},
  {id:'cartridge', title:'Game Cartridge — ROM dump', type:'rom', locked:false, desc:'Local cartridge ROM.', file:'media/cartridge.gbc'},
  {id:'tape', title:'Reel Tape — Audio capture', type:'audio', locked:false, desc:'Local audio capture.', file:'media/tape.mp3'}
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
const downloadBtn = document.getElementById('downloadBtn');
const hexBtn = document.getElementById('hexBtn');

let selected = null;

// ------------------------------
// Render the dataset list
// ------------------------------
function renderList(){
  listEl.innerHTML = '';
  for(const ds of datasets){
    const div = document.createElement('div');
    div.className = 'item' + (ds.locked ? ' locked' : '');
    div.textContent = ds.title;
    div.onclick = () => select(ds.id);
    listEl.appendChild(div);
  }
}

// ------------------------------
// Format file size
// ------------------------------
function formatSize(bytes){
  if(bytes < 1024) return bytes + ' B';
  else if(bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  else return (bytes/1024/1024).toFixed(2) + ' MB';
}

// ------------------------------
// Select a dataset
// ------------------------------
function select(id){
  selected = datasets.find(d => d.id === id);
  vtitle.textContent = selected.title;
  details.innerHTML = `<div style="font-weight:700">${selected.title}</div><div class="small" style="margin-top:6px">${selected.desc}</div>`;

  if(selected.locked){
    content.innerHTML = `<div class="small">Dataset marked restricted.</div>`;
    return;
  }

  if(selected.type === 'audio'){
    const audio = `<audio controls src="${selected.file}"></audio>`;
    content.innerHTML = `<div class="small">${selected.desc}</div>${audio}`;
    fetch(selected.file, {method:'HEAD'}).then(res=>{
      if(res.ok){
        const size = formatSize(res.headers.get('content-length'));
        content.innerHTML += `<div class="small" style="margin-top:6px">File size: ${size}</div>`;
      }
    });
  } else if(selected.type === 'rom'){
    content.innerHTML = `<div class="small">${selected.desc}</div>`;
    fetch(selected.file, {method:'HEAD'}).then(res=>{
      if(res.ok){
        const size = formatSize(res.headers.get('content-length'));
        content.innerHTML += `<div class="small" style="margin-top:6px">File size: ${size}</div>`;
        content.innerHTML += `<div class="small">File type: ${selected.file.split('.').pop().toUpperCase()}</div>`;
      }
    });
  }
}

// ------------------------------
// Access button logic
// ------------------------------
openBtn.onclick = () => {
  if(seed.value.trim() === CORRECT_TOKEN){
    entry.style.display = 'none';
    app.style.display = 'block';
    renderList();
    select('floppy');
    localStorage.setItem('unit6a_unlocked','1');
  } else {
    entrymsg.innerHTML = '<span class="flash">ACCESS REVOKED</span>';
  }
};

seed.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') openBtn.click();
});

// ------------------------------
// Download button
// ------------------------------
downloadBtn.onclick = () => {
  if(!selected) return;
  const a = document.createElement('a');
  a.href = selected.file;
  a.download = selected.file.split('/').pop();
  a.click();
};

// ------------------------------
// Hex button placeholder
// ------------------------------
hexBtn.onclick = () => {
  if(!selected) return;
  content.innerHTML += `<div class="small" style="margin-top:6px">Hex view not available for local files.</div>`;
};

// ------------------------------
// Auto-unlock if previously solved
// ------------------------------
if(localStorage.getItem('unit6a_unlocked')){
  for(const d of datasets) d.locked = false;
}

// Initial render
renderList();
