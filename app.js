(() => {
  'use strict';

  const PAGE_W = 1190.551;
  const PAGE_H = 841.89;
  const STORAGE_KEY = 'abcreno-contract-v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const fields = [
    // En-tête et client
    { id: 'date_commande', x: 130, y: 108, w: 201, h: 15, size: 10, inputType: 'date', prefillToday: true },
    { id: 'conseiller', x: 397, y: 108, w: 234, h: 14, size: 10 },
    { id: 'client_nom', x: 250, y: 150, w: 381, h: 14, size: 10 },
    { id: 'client_adresse', x: 57, y: 171, w: 574, h: 14, size: 10 },
    { id: 'client_cp', x: 73, y: 192, w: 210, h: 14, size: 10 },
    { id: 'client_ville', x: 311, y: 192, w: 320, h: 14, size: 10 },
    { id: 'client_telephone', x: 69, y: 213, w: 144, h: 14, size: 10 },
    { id: 'client_mobile', x: 238, y: 213, w: 151, h: 14, size: 10 },
    { id: 'client_email', x: 433, y: 213, w: 198, h: 14, size: 9 },
    { id: 'installation_nom', x: 249, y: 253, w: 382, h: 14, size: 10 },
    { id: 'installation_adresse', x: 57, y: 275, w: 574, h: 14, size: 10 },
    { id: 'installation_cp', x: 73, y: 289, w: 210, h: 14, size: 10 },
    { id: 'installation_ville', x: 311, y: 289, w: 320, h: 14, size: 10 },

    // Tableau : quantités et détails
    ...Array.from({ length: 18 }, (_, i) => ({ id: `qte_${i + 1}`, x: 12, y: 372 + i * 15, w: 92, h: 13, size: 9, align: 'center' })),
    { id: 'chassis', x: 162, y: 372, w: 184, h: 13, size: 9 },
    { id: 'couleur', x: 397, y: 372, w: 187, h: 13, size: 9 },
    { id: 'materiaux_autres', x: 302, y: 387, w: 266, h: 13, size: 9 },
    { id: 'verres', x: 160, y: 402, w: 424, h: 13, size: 9 },
    { id: 'porte', x: 158, y: 417, w: 166, h: 13, size: 9 },
    { id: 'emplacement_porte', x: 379, y: 417, w: 204, h: 13, size: 9 },
    { id: 'type', x: 150, y: 432, w: 433, h: 13, size: 9 },
    { id: 'vmc_details', x: 402, y: 447, w: 181, h: 13, size: 9 },
    { id: 'emplacement', x: 191, y: 462, w: 392, h: 13, size: 9 },
    { id: 'rampants_m2', x: 112, y: 477, w: 39, h: 13, size: 9, align: 'right' },
    { id: 'rampants_cm', x: 429, y: 477, w: 35, h: 13, size: 9, align: 'right' },
    { id: 'combles_deroule_m2', x: 112, y: 492, w: 39, h: 13, size: 9, align: 'right' },
    { id: 'combles_deroule_details', x: 386, y: 492, w: 197, h: 13, size: 9 },
    { id: 'projection_m2', x: 112, y: 507, w: 39, h: 13, size: 9, align: 'right' },
    { id: 'projection_details', x: 489, y: 507, w: 29, h: 13, size: 9 },
    { id: 'biosource_m2', x: 112, y: 522, w: 39, h: 13, size: 9, align: 'right' },
    { id: 'biosource_details', x: 292, y: 522, w: 290, h: 13, size: 9 },
    { id: 'toiture', x: 269, y: 538, w: 314, h: 13, size: 9 },
    { id: 'ligne_libre_2', x: 112, y: 553, w: 470, h: 13, size: 9 },
    { id: 'ligne_libre_3', x: 112, y: 568, w: 470, h: 13, size: 9 },
    { id: 'ligne_libre_4', x: 112, y: 612, w: 470, h: 13, size: 9 },
    { id: 'remise', x: 113, y: 627, w: 469, h: 13, size: 9 },
    { id: 'taux_tva', x: 377, y: 676, w: 27, h: 16, size: 10, align: 'center' },
    { id: 'montant_total', x: 515, y: 676, w: 104, h: 16, size: 10, align: 'right' },

    // Modalités
    { id: 'acompte', x: 831, y: 192, w: 101, h: 14, size: 10, align: 'right' },
    { id: 'solde', x: 958, y: 213, w: 102, h: 14, size: 10, align: 'right' },
    { id: 'organisme_bancaire', x: 752, y: 297, w: 99, h: 13, size: 9 },
    { id: 'banque_adresse', x: 920, y: 297, w: 143, h: 13, size: 9 },
    { id: 'banque_cp', x: 1090, y: 297, w: 77, h: 13, size: 9 },
    { id: 'teg', x: 777, y: 351, w: 154, h: 14, size: 9 },
    { id: 'taux_nominal', x: 720, y: 368, w: 73, h: 14, size: 9 },
    { id: 'montant_pret', x: 876, y: 368, w: 60, h: 14, size: 9 },
    { id: 'nb_echeances', x: 758, y: 384, w: 90, h: 14, size: 9 },
    { id: 'montant_echeances', x: 966, y: 384, w: 70, h: 14, size: 9 },
    { id: 'date_installation', x: 750, y: 495, w: 180, h: 15, size: 10, inputType: 'date' },
    { id: 'fait_a', x: 689, y: 662, w: 140, h: 15, size: 10 },
    { id: 'date_signature', x: 1001, y: 662, w: 101, h: 15, size: 10, inputType: 'date', prefillToday: true },

    // Cases à cocher
    { id: 'periodicite_mensuel', type: 'check', x: 1001, y: 363, w: 20, h: 22, exclusive: 'periodicite' },
    { id: 'periodicite_annuel', type: 'check', x: 1120, y: 363, w: 20, h: 22, exclusive: 'periodicite' },
    { id: 'biosource', type: 'check', x: 51, y: 522, w: 13, h: 13, square: true }
  ];

  const state = {
    values: {},
    signatures: { adviser: '', client: '' },
    activeSignature: null,
    fitScale: 1,
    manualZoom: 1,
    zones: false
  };

  const fieldLayer = $('#field-layer');
  const pdfPage = $('#pdf-page');
  const pageFrame = $('#page-frame');
  const pageViewport = $('#page-viewport');
  const signatureDialog = $('#signature-dialog');
  const signaturePad = $('#signature-pad');
  const signatureContext = signaturePad.getContext('2d');
  let drawing = false;
  let dirtySignature = false;
  let saveTimer;
  let toastTimer;

  function buildFields() {
    fields.forEach(field => {
      if (field.type === 'check') {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `check-field${field.square ? ' square-check' : ''}`;
        button.dataset.field = field.id;
        button.setAttribute('aria-label', labelFor(field.id));
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML = '<span class="mark"></span>';
        positionElement(button, field);
        button.addEventListener('click', () => toggleCheck(field));
        fieldLayer.appendChild(button);
        return;
      }

      const input = document.createElement('input');
      input.type = field.inputType || 'text';
      input.className = `form-field${field.inputType === 'date' ? ' date-field' : ''}`;
      input.dataset.field = field.id;
      input.setAttribute('aria-label', labelFor(field.id));
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.style.fontSize = `${field.size || 9}px`;
      input.style.textAlign = field.align || 'left';
      positionElement(input, field);
      input.addEventListener('input', () => {
        state.values[field.id] = input.value;
        queueSave();
      });
      fieldLayer.appendChild(input);
    });

    const replacementMask = document.createElement('span');
    replacementMask.className = 'row-replacement-mask';
    fieldLayer.appendChild(replacementMask);

    const biosourceRow = document.createElement('span');
    biosourceRow.className = 'biosource-row';
    biosourceRow.textContent = '................m2 isolation Biosourcé................................................................';
    fieldLayer.appendChild(biosourceRow);

    const toitureRow = document.createElement('span');
    toitureRow.className = 'toiture-row';
    toitureRow.textContent = 'Réfection Toiture complète : ........................................................................';
    fieldLayer.appendChild(toitureRow);

  }

  function positionElement(element, field) {
    element.style.left = `${field.x}px`;
    element.style.top = `${field.y}px`;
    element.style.width = `${field.w}px`;
    element.style.height = `${field.h}px`;
  }

  function labelFor(id) {
    return id.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
  }

  function todayIso() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function normalizeDate(value) {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const match = String(value).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
  }

  function formatDateForPdf(value) {
    const iso = normalizeDate(value);
    if (!iso) return value || '';
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
  }

  function toggleCheck(field) {
    const next = !Boolean(state.values[field.id]);
    if (field.exclusive && next) {
      fields.filter(item => item.exclusive === field.exclusive).forEach(item => {
        state.values[item.id] = false;
        renderCheck(item.id);
      });
    }
    state.values[field.id] = next;
    renderCheck(field.id);
    queueSave();
  }

  function renderCheck(id) {
    const button = $(`[data-field="${id}"]`);
    if (!button) return;
    const checked = Boolean(state.values[id]);
    button.setAttribute('aria-pressed', String(checked));
    $('.mark', button).textContent = checked ? '×' : '';
  }

  function hydrate() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      state.values = saved.values || {};
      state.signatures = { ...state.signatures, ...(saved.signatures || {}) };
    } catch (_) {
      state.values = {};
    }

    fields.forEach(field => {
      if (field.type === 'check') return renderCheck(field.id);
      const input = $(`[data-field="${field.id}"]`);
      if (!input) return;
      let value = state.values[field.id] || '';
      if (field.inputType === 'date') {
        value = normalizeDate(value);
        if (!value && field.prefillToday) value = todayIso();
        state.values[field.id] = value;
      }
      input.value = value;
    });
    saveState();
    renderSignatures();
  }

  function queueSave() {
    setStatus('Enregistrement…', 'Vos données restent uniquement sur cet ordinateur.', true);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 300);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: state.values, signatures: state.signatures }));
    setStatus('Brouillon enregistré', 'Vos modifications restent sur cet ordinateur.', false);
  }

  function setStatus(title, detail, working) {
    $('#status-title').textContent = title;
    $('#status-detail').textContent = detail;
    $('.status-card').classList.toggle('working', working);
  }

  function updateScale() {
    const available = Math.max(280, pageViewport.clientWidth - 68);
    state.fitScale = Math.min(1, available / PAGE_W);
    const scale = Math.max(.35, Math.min(1.8, state.fitScale * state.manualZoom));
    pdfPage.style.setProperty('--page-scale', scale);
    pageFrame.style.width = `${PAGE_W * scale}px`;
    pageFrame.style.height = `${PAGE_H * scale}px`;
    $('#zoom-fit').textContent = `${Math.round(scale * 100)} %`;
  }

  function openSignature(kind) {
    state.activeSignature = kind;
    $('#signature-title').textContent = kind === 'adviser' ? 'Signature du conseiller' : 'Signature du client';
    clearSignaturePad();
    signatureDialog.showModal();
  }

  function clearSignaturePad() {
    signatureContext.clearRect(0, 0, signaturePad.width, signaturePad.height);
    signatureContext.lineWidth = 4;
    signatureContext.lineCap = 'round';
    signatureContext.lineJoin = 'round';
    signatureContext.strokeStyle = '#11171d';
    dirtySignature = false;
  }

  function pointerPosition(event) {
    const rect = signaturePad.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * signaturePad.width / rect.width,
      y: (event.clientY - rect.top) * signaturePad.height / rect.height
    };
  }

  function beginStroke(event) {
    event.preventDefault();
    drawing = true;
    dirtySignature = true;
    signaturePad.setPointerCapture(event.pointerId);
    const point = pointerPosition(event);
    signatureContext.beginPath();
    signatureContext.moveTo(point.x, point.y);
  }

  function continueStroke(event) {
    if (!drawing) return;
    event.preventDefault();
    const point = pointerPosition(event);
    signatureContext.lineTo(point.x, point.y);
    signatureContext.stroke();
  }

  function endStroke() { drawing = false; }

  function cropSignature() {
    const pixels = signatureContext.getImageData(0, 0, signaturePad.width, signaturePad.height);
    let minX = signaturePad.width, minY = signaturePad.height, maxX = 0, maxY = 0;
    let found = false;
    for (let y = 0; y < signaturePad.height; y += 2) {
      for (let x = 0; x < signaturePad.width; x += 2) {
        if (pixels.data[(y * signaturePad.width + x) * 4 + 3] > 20) {
          found = true;
          minX = Math.min(minX, x); minY = Math.min(minY, y);
          maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        }
      }
    }
    if (!found) return '';
    const pad = 14;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
    maxX = Math.min(signaturePad.width, maxX + pad); maxY = Math.min(signaturePad.height, maxY + pad);
    const crop = document.createElement('canvas');
    crop.width = maxX - minX; crop.height = maxY - minY;
    crop.getContext('2d').drawImage(signaturePad, minX, minY, crop.width, crop.height, 0, 0, crop.width, crop.height);
    return crop.toDataURL('image/png');
  }

  function saveSignature() {
    if (!dirtySignature) {
      showToast('Ajoutez une signature avant de valider.');
      return;
    }
    state.signatures[state.activeSignature] = cropSignature();
    saveState();
    renderSignatures();
    signatureDialog.close();
  }

  function renderSignatures() {
    ['adviser', 'client'].forEach(kind => {
      const zone = $(`[data-signature="${kind}"]`);
      const value = state.signatures[kind];
      zone.classList.toggle('has-signature', Boolean(value));
      $('img', zone).src = value || '';
    });
  }

  async function buildPdf() {
    setStatus('Création du PDF…', 'Le document original est conservé en arrière-plan.', true);
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const source = await fetch('assets/modele-bon-de-commande.pdf').then(response => {
      if (!response.ok) throw new Error('Modèle PDF introuvable');
      return response.arrayBuffer();
    });
    const pdfDoc = await PDFDocument.load(source);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const form = pdfDoc.getForm();

    // Remplace proprement la ligne toiture par Biosourcé, puis descend la toiture.
    page.drawRectangle({
      x: 111,
      y: PAGE_H - 536,
      width: 506,
      height: 14,
      color: rgb(1, 1, 1)
    });
    page.drawText('................m2 isolation Biosourcé................................................................', {
      x: 113,
      y: PAGE_H - 532,
      size: 9,
      font,
      color: rgb(.08,.08,.08)
    });
    page.drawText('Réfection Toiture complète : ........................................................................', {
      x: 113,
      y: PAGE_H - 548,
      size: 9,
      font,
      color: rgb(.08,.08,.08)
    });
    page.drawRectangle({ x: 51, y: PAGE_H - 535, width: 13, height: 13, borderColor: rgb(.08,.08,.08), borderWidth: .8 });

    fields.filter(field => field.type !== 'check').forEach(field => {
      const textField = form.createTextField(field.id);
      const rawValue = String(state.values[field.id] || '');
      const value = field.inputType === 'date' ? formatDateForPdf(rawValue) : rawValue;
      if (value) textField.setText(value);
      if (field.align === 'center') textField.setAlignment(PDFLib.TextAlignment.Center);
      if (field.align === 'right') textField.setAlignment(PDFLib.TextAlignment.Right);
      textField.addToPage(page, {
        x: field.x,
        y: PAGE_H - field.y - field.h,
        width: field.w,
        height: field.h,
        backgroundColor: undefined,
        borderColor: undefined,
        borderWidth: 0,
        textColor: rgb(.03, .04, .05),
        font
      });
      // addToPage initialise l'apparence par défaut requise par setFontSize.
      textField.setFontSize(field.size || 9);
    });

    // Les croix restent visuellement identiques aux sélections faites dans l'application.
    fields.filter(field => field.type === 'check' && state.values[field.id]).forEach(field => {
      page.drawLine({ start: { x: field.x + 3, y: PAGE_H - field.y - 3 }, end: { x: field.x + field.w - 3, y: PAGE_H - field.y - field.h + 3 }, thickness: 1.8, color: rgb(.04,.04,.04) });
      page.drawLine({ start: { x: field.x + field.w - 3, y: PAGE_H - field.y - 3 }, end: { x: field.x + 3, y: PAGE_H - field.y - field.h + 3 }, thickness: 1.8, color: rgb(.04,.04,.04) });
    });

    await drawSignature(pdfDoc, page, state.signatures.adviser, { x: 665, y: PAGE_H - 803, w: 182, h: 84 });
    await drawSignature(pdfDoc, page, state.signatures.client, { x: 868, y: PAGE_H - 803, w: 276, h: 84 });

    form.updateFieldAppearances(font);
    const bytes = await pdfDoc.save();
    setStatus('PDF prêt', 'Le fichier reste modifiable dans un lecteur PDF compatible.', false);
    return new Blob([bytes], { type: 'application/pdf' });
  }

  async function drawSignature(pdfDoc, page, dataUrl, box) {
    if (!dataUrl) return;
    const bytes = await fetch(dataUrl).then(response => response.arrayBuffer());
    const image = await pdfDoc.embedPng(bytes);
    const ratio = Math.min(box.w / image.width, box.h / image.height);
    const width = image.width * ratio;
    const height = image.height * ratio;
    page.drawImage(image, {
      x: box.x + (box.w - width) / 2,
      y: box.y + (box.h - height) / 2,
      width,
      height
    });
  }

  function fileName() {
    const name = String(state.values.client_nom || 'client').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '-').replace(/^-|-$/g, '');
    const date = new Date().toISOString().slice(0, 10);
    return `Bon-de-commande-abcReno-${name || 'client'}-${date}.pdf`;
  }

  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = name;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  async function downloadPdf() {
    try {
      const blob = await buildPdf();
      downloadBlob(blob, fileName());
      showToast('PDF téléchargé. Il peut encore être rempli dans Adobe Acrobat ou Aperçu.');
    } catch (error) {
      console.error(error);
      setStatus('Erreur de création', 'Relancez l’application avec le fichier « Lancer abcReno.command ».', false);
      showToast('Impossible de créer le PDF. Vérifiez que l’application a bien été lancée.');
    }
  }

  async function sharePdf() {
    try {
      const blob = await buildPdf();
      const file = new File([blob], fileName(), { type: 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Bon de commande abcReno', text: 'Bonjour, veuillez trouver ci-joint votre bon de commande abcReno à signer.' });
        showToast('Le PDF a été préparé pour l’envoi.');
      } else {
        downloadBlob(blob, file.name);
        const email = state.values.client_email || '';
        const subject = encodeURIComponent('Bon de commande abcReno à signer');
        const body = encodeURIComponent('Bonjour,\n\nVeuillez trouver le bon de commande abcReno téléchargé sur mon ordinateur. Merci de le signer et de me le renvoyer.\n\nCordialement,');
        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
        showToast('Le PDF est téléchargé. Joignez-le au message qui vient de s’ouvrir.');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error(error);
        showToast('L’envoi n’a pas pu être préparé. Utilisez « Télécharger le PDF ».');
      }
    }
  }

  function resetForm() {
    if (!window.confirm('Effacer tous les champs et les deux signatures ?')) return;
    state.values = {};
    state.signatures = { adviser: '', client: '' };
    localStorage.removeItem(STORAGE_KEY);
    fields.forEach(field => {
      if (field.type === 'check') return renderCheck(field.id);
      const input = $(`[data-field="${field.id}"]`);
      if (!input) return;
      const value = field.prefillToday ? todayIso() : '';
      state.values[field.id] = value;
      input.value = value;
    });
    renderSignatures();
    saveState();
    setStatus('Nouveau bon de commande', 'Tous les champs ont été réinitialisés.', false);
    showToast('Le contrat a été réinitialisé.');
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 4200);
  }

  buildFields();
  hydrate();
  updateScale();

  window.addEventListener('resize', updateScale);
  $('#zoom-in').addEventListener('click', () => { state.manualZoom = Math.min(2.4, state.manualZoom + .15); updateScale(); });
  $('#zoom-out').addEventListener('click', () => { state.manualZoom = Math.max(.5, state.manualZoom - .15); updateScale(); });
  $('#zoom-fit').addEventListener('click', () => { state.manualZoom = 1; updateScale(); });
  $('#toggle-zones').addEventListener('click', event => {
    state.zones = !state.zones;
    pdfPage.classList.toggle('show-zones', state.zones);
    event.currentTarget.setAttribute('aria-pressed', String(state.zones));
  });
  $('#reset').addEventListener('click', resetForm);
  $('#download').addEventListener('click', downloadPdf);
  $('#share').addEventListener('click', sharePdf);
  $$('.signature-zone').forEach(zone => zone.addEventListener('click', () => openSignature(zone.dataset.signature)));
  signaturePad.addEventListener('pointerdown', beginStroke);
  signaturePad.addEventListener('pointermove', continueStroke);
  signaturePad.addEventListener('pointerup', endStroke);
  signaturePad.addEventListener('pointercancel', endStroke);
  $('#clear-signature').addEventListener('click', clearSignaturePad);
  $('#save-signature').addEventListener('click', saveSignature);
})();
