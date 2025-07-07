
function openSidebar() {
	document.getElementById('sidebar').classList.add('open');
	document.getElementById('overlay').classList.add('active');
}

function closeSidebar() {
	document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

