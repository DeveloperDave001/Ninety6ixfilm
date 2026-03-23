<script>
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  DATA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const STORAGE_KEY = 'nxf_submissions';

const SEED_DATA = [
    {ref:'NXF-4821',submittedAt:'2026-03-15T09:23:11Z',status:'New',type:'Video Production',budget:'$150K â€“ $500K',timeline:'6â€“12 months',services:['Video Production','Post-Production'],projTitle:'The Margin',logline:'A former boxer opens a school in a Lagos slum and fights to keep it open.',genre:'Drama',audience:'General Public',location:'Lagos, Nigeria',dateStart:'2026-07-01',dateEnd:'2026-08-31',firstName:'Emeka',lastName:'Okafor',email:'emeka@okaforfilms.com',phone:'+234 812 345 6789',company:'Okafor Films Ltd.',role:'Production Company',referral:'Referral',notes:'We have a first draft script ready and a letter of interest from a broadcaster.'},
    {ref:'NXF-2293',submittedAt:'2026-03-14T14:08:42Z',status:'Reviewing',type:'Commercials',budget:'$50K â€“ $150K',timeline:'1â€“3 months',services:['Commercials','Post-Production'],projTitle:'Bloom â€” Spring Campaign',logline:'Hero video for a luxury skincare brand launching in the UK and Nigeria.',genre:'Other',audience:'Young Adults (18â€“30)',location:'London, UK',dateStart:'2026-04-15',dateEnd:'2026-05-10',firstName:'Sophia',lastName:'Adeyemi',email:'sophia@brandbloom.co.uk',phone:'+44 7712 345678',company:'BrandBloom Agency',role:'Brand / Marketing',referral:'Instagram',notes:'Reference look: Chanel No. 5 campaign from 2023. Budget is firm.'},
    {ref:'NXF-7741',submittedAt:'2026-03-13T07:55:30Z',status:'Contacted',type:'Podcast',budget:'$10K â€“ $50K',timeline:'6â€“12 months',services:['Podcast','Post-Production'],projTitle:'The Weavers',logline:'A podcast series about three women keeping Aso-Oke weaving alive.',genre:'Documentary',audience:'Festival Circuit',location:'Oshogbo, Nigeria',dateStart:'2026-06-01',dateEnd:'',firstName:'Amina',lastName:'Bello',email:'amina.bello@documentary.ng',phone:'+234 803 111 2233',company:'',role:'Independent Creator',referral:'Film Festival',notes:'Low budget, passion project. Willing to discuss co-production arrangements.'},
    {ref:'NXF-9102',submittedAt:'2026-03-12T16:40:00Z',status:'New',type:'Music Videos',budget:'Under $10K',timeline:'ASAP',services:['Music Videos','Post-Production'],projTitle:'Retrograde',logline:'Visual concept for a psychedelic Afro-fusion single.',genre:'Other',audience:'Young Adults (18â€“30)',location:'Abuja, Nigeria',dateStart:'2026-03-25',dateEnd:'',firstName:'Kelechi',lastName:'Eze',email:'kelechi@ezesound.ng',phone:'+234 701 887 6543',company:'Eze Sound',role:'Record Label',referral:'Google Search',notes:'Need a 4-minute video. Open to creative direction entirely.'},
    {ref:'NXF-3350',submittedAt:'2026-03-11T11:22:18Z',status:'Archived',type:'Video Production',budget:'$10K â€“ $50K',timeline:'3â€“6 months',services:['Video Production','Drone Coverage'],projTitle:'Hairline Cracks',logline:'A marriage dissolves over a single dinner conversation.',genre:'Drama',audience:'Festival Circuit',location:'Accra, Ghana',dateStart:'2026-05-01',dateEnd:'2026-06-01',firstName:'Yaw',lastName:'Mensah',email:'yaw.mensah@filmghana.com',phone:'+233 20 543 7812',company:'Film Ghana',role:'Independent Creator',referral:'Vimeo',notes:'Will handle Ghana location permits ourselves.'},
    {ref:'NXF-5519',submittedAt:'2026-03-10T08:14:55Z',status:'Contacted',type:'Commercials',budget:'$150K â€“ $500K',timeline:'12+ months',services:['Commercials','Video Production','Post-Production'],projTitle:'Lagos After Dark',logline:'Commercial series exploring the nighttime economy of Lagos.',genre:'Documentary',audience:'Streaming Platforms',location:'Lagos, Nigeria',dateStart:'2026-09-01',dateEnd:'',firstName:'Tunde',lastName:'Adewale',email:'tunde@streamhouse.tv',phone:'+234 814 225 9900',company:'StreamHouse Media',role:'Production Company',referral:'Press',notes:'Seeking creative producer and full-service production. Broad development budget available.'}
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let allData = [];
let filteredData = [];
let currentSort = { key: 'submittedAt', dir: 'desc' };
let currentPage = 1;
const PAGE_SIZE = 10;
let currentPageFilter = 'all';
let isSeeded = false;

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  LOGIN
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function attemptLogin() {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const err  = document.getElementById('loginError');
    if (user === 'admin' && pass === 'Ninety6ix') {
        sessionStorage.setItem('nxf_admin', 'true');
        sessionStorage.setItem('nxf_admin_name', 'Studio Admin');
        document.getElementById('loginGate').classList.add('hidden');
        document.getElementById('adminName').textContent = 'Studio Admin';
        document.getElementById('adminAvatar').textContent = 'SA';
        init();
    } else {
        err.textContent = 'Invalid credentials. Please try again.';
        document.getElementById('loginPass').value = '';
    }
}
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function logout() {
    sessionStorage.removeItem('nxf_admin');
    document.getElementById('loginGate').classList.remove('hidden');
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginError').textContent = '';
}

// Auto-login if session exists
if (sessionStorage.getItem('nxf_admin') === 'true') {
    document.getElementById('loginGate').classList.add('hidden');
    document.getElementById('adminName').textContent = sessionStorage.getItem('nxf_admin_name') || 'Admin';
    document.getElementById('adminAvatar').textContent = 'SA';
    init();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  INIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function init() {
    loadData();
    renderStats();
    renderTable();
    startClock();
}

function loadData() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (stored.length === 0) {
            // No real submissions yet â€” use seed data and show notice
            allData = SEED_DATA.map(d => ({...d}));
            isSeeded = true;
            document.getElementById('seedNotice').style.display = 'flex';
        } else {
            allData = stored;
            isSeeded = false;
            document.getElementById('seedNotice').style.display = 'none';
        }
    } catch(e) {
        allData = SEED_DATA.map(d => ({...d}));
        isSeeded = true;
    }
}

function saveData() {
    if (!isSeeded) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(allData)); } catch(e) {}
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  CLOCK
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function startClock() {
    const update = () => {
        const now = new Date();
        document.getElementById('topbarTime').textContent =
            now.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}) + ' Â· ' +
            now.toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    };
    update(); setInterval(update, 1000);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  NAV PAGES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const pageTitles = { all:'All Submissions', new:'New Leads', reviewing:'In Review', contacted:'Contacted', archived:'Archived' };

function setPage(page) {
    currentPageFilter = page;
    currentPage = 1;
    document.querySelectorAll('.nav-item').forEach((el, i) => el.classList.remove('active'));
    document.querySelectorAll('.nav-item')[['submissions','new','reviewing','contacted','archived'].indexOf(page === 'submissions' ? 'submissions' : page) >= 0 ?
        ['submissions','new','reviewing','contacted','archived','__','__'].indexOf(page === 'submissions' ? 'submissions' : page) : 0].classList.add('active');
    // Simpler approach:
    const items = document.querySelectorAll('.nav-item');
    items.forEach(el => el.classList.remove('active'));
    const map = {submissions:0,new:1,reviewing:2,contacted:3,archived:5};
    if (map[page] !== undefined) items[map[page]].classList.add('active');
    document.getElementById('topbarTitle').textContent = pageTitles[page === 'submissions' ? 'all' : page] || 'All Submissions';
    // Set status filter
    const sf = document.getElementById('statusFilter');
    const statusMap = {new:'New',reviewing:'Reviewing',contacted:'Contacted',archived:'Archived',submissions:''};
    sf.value = statusMap[page] || '';
    renderTable();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STATS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderStats() {
    document.getElementById('statTotal').textContent = allData.length;
    document.getElementById('statNew').textContent = allData.filter(d => d.status === 'New').length;
    document.getElementById('statContacted').textContent = allData.filter(d => d.status === 'Contacted').length;
    document.getElementById('statReviewing').textContent = allData.filter(d => d.status === 'Reviewing').length;
    const newCount = allData.filter(d => d.status === 'New').length;
    document.getElementById('newBadge').textContent = newCount;
    document.getElementById('newBadge').style.display = newCount > 0 ? '' : 'none';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  TABLE RENDER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderTable() {
    const search  = document.getElementById('searchInput').value.toLowerCase();
    const typeF   = document.getElementById('typeFilter').value;
    const statusF = document.getElementById('statusFilter').value;

    filteredData = allData.filter(d => {
        const matchSearch = !search ||
            (d.firstName + ' ' + d.lastName).toLowerCase().includes(search) ||
            (d.email || '').toLowerCase().includes(search) ||
            (d.ref || '').toLowerCase().includes(search) ||
            (d.projTitle || '').toLowerCase().includes(search) ||
            (d.company || '').toLowerCase().includes(search);
        const matchType   = !typeF   || d.type === typeF;
        const matchStatus = !statusF || d.status === statusF;
        return matchSearch && matchType && matchStatus;
    });

    // Sort
    filteredData.sort((a, b) => {
        let va = a[currentSort.key] || '';
        let vb = b[currentSort.key] || '';
        if (currentSort.key === 'name') { va = a.firstName+a.lastName; vb = b.firstName+b.lastName; }
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return currentSort.dir === 'asc' ? cmp : -cmp;
    });

    const total = filteredData.length;
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageData = filteredData.slice(start, start + PAGE_SIZE);

    const tbody = document.getElementById('tableBody');
    const empty = document.getElementById('emptyState');
    const table = document.getElementById('submissionsTable');

    if (total === 0) {
        table.style.display = 'none';
        empty.style.display = 'block';
    } else {
        table.style.display = '';
        empty.style.display = 'none';
    }

    tbody.innerHTML = '';
    pageData.forEach(d => {
        const name = [d.firstName, d.lastName].filter(Boolean).join(' ') || 'â€”';
        const date = d.submittedAt ? new Date(d.submittedAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : 'â€”';
        const time = d.submittedAt ? new Date(d.submittedAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}) : '';
        const statusClass = (d.status || 'new').toLowerCase();
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="td-ref">${d.ref || 'â€”'}</span></td>
            <td>
                <div class="td-name">${name}</div>
                <div class="td-company">${d.company || (d.email || '')}</div>
            </td>
            <td><span class="type-tag">${d.type || 'â€”'}</span></td>
            <td><span class="td-budget">${d.budget || 'â€”'}</span></td>
            <td><span class="status-pill ${statusClass}"><span class="status-dot"></span>${d.status || 'New'}</span></td>
            <td><div class="td-date">${date}</div><div class="td-date" style="color:#444">${time}</div></td>
            <td>
                <div class="row-actions">
                    <button class="row-action-btn" title="View" onclick="event.stopPropagation();openDrawer('${d.ref}')"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg></button>
                    <button class="row-action-btn" title="Mark Contacted" onclick="event.stopPropagation();updateStatus('${d.ref}','Contacted')"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
                    <button class="row-action-btn del" title="Archive" onclick="event.stopPropagation();updateStatus('${d.ref}','Archived')"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg></button>
                </div>
            </td>
        `;
        tr.addEventListener('click', () => openDrawer(d.ref));
        tbody.appendChild(tr);
    });

    // Pagination
    document.getElementById('tableInfo').textContent = `Showing ${Math.min(start+1, total)}â€“${Math.min(start+PAGE_SIZE, total)} of ${total} submission${total !== 1 ? 's' : ''}`;
    const pages = Math.ceil(total / PAGE_SIZE);
    const pg = document.getElementById('pagination');
    pg.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.onclick = () => { currentPage = i; renderTable(); };
        pg.appendChild(btn);
    }

    renderStats();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  SORT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function sortBy(key) {
    if (currentSort.key === key) currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    else { currentSort.key = key; currentSort.dir = 'asc'; }
    document.querySelectorAll('thead th').forEach(th => th.classList.remove('sorted'));
    renderTable();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STATUS UPDATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function updateStatus(ref, status) {
    const d = allData.find(x => x.ref === ref);
    if (!d) return;
    d.status = status;
    saveData();
    renderTable();
    showToast('Status Updated', `${ref} marked as ${status}.`, 'success');
    // Also update drawer if open
    if (document.getElementById('drawerOverlay').classList.contains('open') &&
        document.getElementById('drawerRef').textContent === ref) {
        openDrawer(ref);
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  DRAWER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function openDrawer(ref) {
    const d = allData.find(x => x.ref === ref);
    if (!d) return;
    document.getElementById('drawerRef').textContent = d.ref;

    const name = [d.firstName, d.lastName].filter(Boolean).join(' ') || 'â€”';
    const initials = [(d.firstName||'')[0], (d.lastName||'')[0]].filter(Boolean).join('').toUpperCase() || '?';
    const date = d.submittedAt ? new Date(d.submittedAt).toLocaleString('en-GB',{dateStyle:'long',timeStyle:'short'}) : 'â€”';
    const statusClass = (d.status||'new').toLowerCase();

    const statusBtns = ['New','Reviewing','Contacted','Archived'].map(s => {
        let activeClass = '';
        if (d.status === s) {
            const m = {New:'active',Reviewing:'active-reviewing',Contacted:'active-contacted',Archived:'active-archived'};
            activeClass = m[s];
        }
        return `<button class="status-change-btn ${activeClass}" onclick="updateStatus('${ref}','${s}')">${s}</button>`;
    }).join('');

    document.getElementById('drawerBody').innerHTML = `
        <div class="drawer-client">
            <div class="drawer-avatar">${initials}</div>
            <div>
                <div class="drawer-client-name">${name}</div>
                <div class="drawer-client-meta">
                    <a href="mailto:${d.email}">${d.email || 'â€”'}</a><br>
                    ${d.phone || ''}${d.phone && d.company ? ' Â· ' : ''}${d.company || ''}
                </div>
            </div>
        </div>

        <div class="drawer-status-row">
            <div class="status-pill ${statusClass}"><span class="status-dot"></span>${d.status}</div>
            <div class="status-changer">${statusBtns}</div>
        </div>

        <div class="d-section">
            <div class="d-section-title">Project Brief</div>
            <div class="d-row"><span class="d-key">Project Title</span><span class="d-val">${d.projTitle || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Type</span><span class="d-val">${d.type || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Genre</span><span class="d-val">${d.genre || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Audience</span><span class="d-val">${d.audience || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Location</span><span class="d-val">${d.location || 'â€”'}</span></div>
            ${d.dateStart ? `<div class="d-row"><span class="d-key">Earliest Start</span><span class="d-val">${d.dateStart}</span></div>` : ''}
            ${d.dateEnd   ? `<div class="d-row"><span class="d-key">Latest Start</span><span class="d-val">${d.dateEnd}</span></div>`   : ''}
        </div>

        ${d.logline ? `
        <div class="d-section">
            <div class="d-section-title">Logline</div>
            <div class="notes-box">"${d.logline}"</div>
        </div>` : ''}

        <div class="d-section">
            <div class="d-section-title">Budget & Timeline</div>
            <div class="d-row"><span class="d-key">Budget</span><span class="d-val gold">${d.budget || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Timeline</span><span class="d-val">${d.timeline || 'â€”'}</span></div>
        </div>

        ${d.services && d.services.length ? `
        <div class="d-section">
            <div class="d-section-title">Services Requested</div>
            <div class="services-list">${d.services.map(s=>`<span class="service-chip">${s}</span>`).join('')}</div>
        </div>` : ''}

        <div class="d-section">
            <div class="d-section-title">Client Details</div>
            <div class="d-row"><span class="d-key">Full Name</span><span class="d-val">${name}</span></div>
            <div class="d-row"><span class="d-key">Email</span><span class="d-val"><a href="mailto:${d.email}" style="color:var(--gold);text-decoration:none">${d.email || 'â€”'}</a></span></div>
            <div class="d-row"><span class="d-key">Phone</span><span class="d-val">${d.phone || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Company</span><span class="d-val">${d.company || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Role</span><span class="d-val">${d.role || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Referred By</span><span class="d-val">${d.referral || 'â€”'}</span></div>
            <div class="d-row"><span class="d-key">Submitted</span><span class="d-val">${date}</span></div>
            <div class="d-row"><span class="d-key">Reference</span><span class="d-val gold">${d.ref}</span></div>
        </div>

        ${d.notes ? `
        <div class="d-section">
            <div class="d-section-title">Additional Notes</div>
            <div class="notes-box">${d.notes}</div>
        </div>` : ''}

        <div class="drawer-actions">
            <button class="d-action primary" onclick="copyEmail('${d.email}')">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                Copy Email
            </button>
            <button class="d-action" onclick="updateStatus('${d.ref}','Reviewing')">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Mark Reviewing
            </button>
            <button class="d-action" onclick="updateStatus('${d.ref}','Contacted')">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Mark Contacted
            </button>
            <button class="d-action danger" onclick="deleteEntry('${d.ref}')">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                Delete
            </button>
        </div>
    `;
    document.getElementById('drawerOverlay').classList.add('open');
}

function closeDrawer(e) { if (e.target === document.getElementById('drawerOverlay')) closeDrawerDirect(); }
function closeDrawerDirect() { document.getElementById('drawerOverlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawerDirect(); });

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  ACTIONS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function copyEmail(email) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => showToast('Copied', email + ' copied to clipboard.', 'success'));
}

function deleteEntry(ref) {
    if (!confirm(`Delete submission ${ref}? This cannot be undone.`)) return;
    allData = allData.filter(d => d.ref !== ref);
    saveData();
    closeDrawerDirect();
    renderTable();
    showToast('Deleted', ref + ' has been removed.', 'danger');
}

function confirmClearAll() {
    if (!confirm('Clear ALL submissions? This will permanently delete all data and reset to sample entries.')) return;
    localStorage.removeItem(STORAGE_KEY);
    loadData();
    renderTable();
    showToast('Cleared', 'All submissions have been removed.', 'danger');
}

function exportPDF() {
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Submissions Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { color: #1a1a1a; border-bottom: 2px solid #3B82F6; padding-bottom: 10px; }
        .meta { color: #666; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 12px; }
        th { background: #f5f5f5; font-weight: bold; }
        .status-new { color: #3B82F6; }
        .status-contacted { color: #10B981; }
        .status-archived { color: #666; }
        .gold { color: #3B82F6; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Ninety6ixfilmco. Submissions</h1>
    <p class="meta">Generated: ${new Date().toLocaleString()} | Total: ${filteredData.length} submission${filteredData.length !== 1 ? 's' : ''}</p>
    <table>
        <thead>
            <tr>
                <th>Ref</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            ${filteredData.map(d => `
            <tr>
                <td class="gold">${d.ref || 'â€”'}</td>
                <td>${d.firstName || ''} ${d.lastName || ''}</td>
                <td>${d.email || 'â€”'}</td>
                <td>${d.type || 'â€”'}</td>
                <td>${d.budget || 'â€”'}</td>
                <td>${d.timeline || 'â€”'}</td>
                <td class="status-${(d.status||'new').toLowerCase()}">${d.status || 'New'}</td>
                <td>${d.submittedAt ? new Date(d.submittedAt).toLocaleDateString() : 'â€”'}</td>
            </tr>`).join('')}
        </tbody>
    </table>
</body>
</html>`;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
    showToast('PDF Generated', `${filteredData.length} submission${filteredData.length !== 1 ? 's' : ''} ready for PDF export.`, 'success');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  TOAST
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let toastTimer;
function showToast(title, msg, type='') {
    const t = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMsg').textContent = msg;
    t.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.classList.remove('show'); }, 3500);
}

// Poll for new real submissions every 5 seconds
setInterval(() => {
    if (!isSeeded && sessionStorage.getItem('lmp_admin') === 'true') {
        const freshCount = (() => {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').length; } catch(e) { return 0; }
        })();
        if (freshCount !== allData.length) {
            loadData();
            renderTable();
        }
    }
}, 5000);

function checkScreenSize() {
    if (window.innerWidth <= 1024) {
        document.getElementById('mobileBlocked').style.display = 'flex';
        document.getElementById('adminMain').style.display = 'none';
    } else {
        document.getElementById('mobileBlocked').style.display = 'none';
        document.getElementById('adminMain').style.display = 'block';
    }
}
window.addEventListener('resize', checkScreenSize);
checkScreenSize();
</script>

<!-- Mobile Blocked Styles -->
