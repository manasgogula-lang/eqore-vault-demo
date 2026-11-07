// ---------- Demo data and templates (inlined into the page by build.mjs) ----------
const PHASES = ['Pre-planning', 'Permitting', 'Interconnection', 'Construction', 'Commissioning', 'Operations'];
const OWNER_DEFAULTS = ['Granite EPC', 'Engineer of record', 'EQORE', 'Customer', 'Utility'];

// Standard packet set every new project starts with: [name, phase, kind, to, owner, blurb, docs[[name, ref, owner]]]
const STANDARD_PACKETS = [
  ['Site assessment & design', 'Pre-planning', 'Internal packet', 'EQORE engineering', 'EQORE', 'Site data, sizing and the stamped plan set.', [
    ['Site information packet', 'Pole, transformer, MDP & meter photos', 'EQORE'],
    ['Aerial map & site survey', 'Property & setbacks', 'EQORE'],
    ['12 months of utility bills & interval data', 'From customer', 'Customer'],
    ['Load analysis & battery sizing', 'Savings model', 'EQORE'],
    ['Signed customer agreement', 'Executed', 'Customer'],
    ['Equipment selection & spec sheets', 'Battery, inverters, transformer', 'EQORE'],
    ['Engineered plan set', 'Stamped', 'Engineer of record']]],
  ['Building & electrical permit', 'Permitting', 'AHJ submission', 'Town Building Dept', 'Granite EPC', 'Building and electrical permits from the town.', [
    ['Building permit application', 'Town form', 'Granite EPC'],
    ['Electrical permit application', 'Town form', 'Granite EPC'],
    ['Stamped plan set', 'All sheets', 'Engineer of record'],
    ['Structural calcs: slab, beams, anchors, welds', 'ESS-6.3 – 6.4, 12.0', 'Engineer of record'],
    ['Electrical calculations', 'ESS-15.0', 'Engineer of record'],
    ['Site plan with setbacks', 'ESS-1.0', 'Engineer of record'],
    ['Equipment spec sheets', 'ESS-14', 'EQORE'],
    ['UL 9540 / UL 1741 SB listings', 'OEM certificates', 'EQORE'],
    ['Electrician license', 'State license', 'Granite EPC'],
    ['Certificate of insurance', 'Contractor', 'Granite EPC'],
    ['Owner authorization letter', 'Signed', 'Customer']]],
  ['Fire marshal (NFPA 855)', 'Permitting', 'AHJ submission', 'Town Fire Prevention', 'Granite EPC', 'Fire department review of the battery system under NFPA 855.', [
    ['Fire permit application', 'Town form', 'Granite EPC'],
    ['Stamped site plan with setbacks', 'ESS-1.0', 'Engineer of record'],
    ['NFPA 855 compliance summary', 'ESS-20.0', 'Engineer of record'],
    ['UL 9540 system listing', 'OEM certificate', 'EQORE'],
    ['UL 9540A fire test report', 'OEM report', 'EQORE'],
    ['Fire suppression design & data sheets', 'ESS-19.0', 'Engineer of record'],
    ['LFP battery safety data sheet', 'OEM', 'EQORE'],
    ['Hazard signage plan', 'ESS-18.0', 'Engineer of record'],
    ['Fire department access plan', 'Site plan markup', 'Granite EPC'],
    ['Emergency response plan', 'Required by fire marshal', 'Granite EPC'],
    ['Hazard mitigation analysis', 'If required by AHJ', 'Engineer of record']]],
  ['Utility interconnection', 'Interconnection', 'Utility submission', 'Utility', 'EQORE', 'Application, studies and permission to operate from the utility.', [
    ['Interconnection application', 'Utility portal', 'EQORE'],
    ['One-line diagram', 'ESS-13.0', 'Engineer of record'],
    ['Site plan', 'ESS-1.0', 'Engineer of record'],
    ['Inverter UL 1741 SB certificate', 'OEM', 'EQORE'],
    ['Export control description', 'Engineer letter', 'Engineer of record'],
    ['Protection & relay settings', 'Settings file', 'Engineer of record'],
    ['Signed interconnection agreement', 'Executed', 'EQORE'],
    ['Approval to construct', 'Utility letter', 'Utility'],
    ['Witness test record', 'After town final', 'Utility'],
    ['Permission to operate letter', 'Utility letter', 'Utility']]],
  ['Construction & inspections', 'Construction', 'Inspection packet', 'Town inspector', 'Granite EPC', 'Field records collected as work happens.', [
    ['Notice to proceed', 'Signed', 'EQORE'],
    ['Dig Safe ticket', 'Ticket number', 'Granite EPC'],
    ['Pad post-pour structural inspection', 'Inspector report', 'Granite EPC'],
    ['Concrete batch tickets', '3,500 psi', 'Granite EPC'],
    ['Weld photos & welder certification', 'ESS-6.4 · AWS D1.1', 'Granite EPC'],
    ['Trench depth photos (≥ 24 in)', 'ESS-5.0', 'Granite EPC'],
    ['Construction photo log', 'By stage', 'Granite EPC'],
    ['Field redlines', 'Changes to plan set', 'Granite EPC'],
    ['Change order log', 'Signed changes', 'EQORE'],
    ['Rough electrical inspection', 'Town inspector', 'Granite EPC'],
    ['Final electrical inspection sign-off', 'Town inspector', 'Town inspector'],
    ['As-built drawings', 'Updated plan set', 'Engineer of record']]],
  ['Commissioning & energization', 'Commissioning', 'Internal + utility', 'EQORE engineering, Utility', 'EQORE', 'Energization can’t be recorded until every test is filed.', [
    ['Commissioning plan', 'Procedure', 'EQORE'],
    ['Pre-energization checklist', 'Signed', 'Granite EPC'],
    ['Insulation & continuity test results', 'Test report', 'Granite EPC'],
    ['Inverter & battery startup report', 'OEM procedure', 'EQORE'],
    ['Fire suppression & annunciation test', 'OEM procedure', 'EQORE'],
    ['Charge / discharge functional test', 'Test report', 'EQORE'],
    ['Energization record', 'Date & sign-off', 'EQORE'],
    ['Customer training & handoff sign-off', 'Signed', 'Customer']]],
  ['Maintenance & warranty', 'Operations', 'Warranty file', 'Battery & inverter manufacturers', 'EQORE', 'Keeps the warranty valid: registrations, installer proof and maintenance records.', [
    ['Equipment serial number register', 'Battery, inverters, transformer', 'Granite EPC'],
    ['Certified installer proof', 'OEM training cert', 'Granite EPC'],
    ['Battery warranty registration', 'Due after commissioning', 'EQORE'],
    ['Inverter warranty registration', 'Due after commissioning', 'EQORE'],
    ['Commissioning report sent to manufacturer', 'OEM requirement', 'EQORE'],
    ['Preventive maintenance schedule', 'Per OEM manual', 'EQORE'],
    ['Thermal / HVAC service logs', 'Each service', 'EQORE'],
    ['Annual inspection report', 'Yearly', 'EQORE'],
    ['Firmware update log', 'Each update', 'EQORE']]],
  ['Operations & performance', 'Operations', 'Lifetime records', 'EQORE, Customer', 'EQORE', 'Recurring records for the life of the system.', [
    ['Monthly performance report', 'Monthly', 'EQORE'],
    ['Battery state-of-health trend', 'Monthly', 'EQORE'],
    ['Annual capacity test', 'Yearly', 'EQORE'],
    ['Availability & downtime log', 'Continuous', 'EQORE'],
    ['Alarm & incident log', 'As needed', 'EQORE'],
    ['Customer savings report', 'Quarterly', 'EQORE'],
    ['Decommissioning plan', 'End of life', 'EQORE']]]
];

// Starting points for a custom packet
const PACKET_TEMPLATES = {
  'Blank': [],
  'Incentive program': [['Program application', 'Program form', 'EQORE'], ['Interconnection approval', 'Utility letter', 'Utility'], ['Equipment invoices', 'Paid invoices', 'Granite EPC'], ['Commissioning report', 'Signed', 'EQORE'], ['W-9', 'Customer', 'Customer']],
  'Insurance & safety': [['Certificate of insurance', 'Contractor', 'Granite EPC'], ['Site safety plan', 'OSHA', 'Granite EPC'], ['Arc flash study', 'Engineer report', 'Engineer of record'], ['Owner’s builder’s risk policy', 'Policy', 'Customer']],
  'Customer handoff': [['Operations & maintenance manual', 'OEM', 'EQORE'], ['As-built drawings', 'Final', 'Engineer of record'], ['Warranty certificates', 'Battery & inverters', 'EQORE'], ['Training sign-off', 'Signed', 'Customer']],
  'Decommissioning': [['Decommissioning plan', 'End of life', 'EQORE'], ['Battery recycling agreement', 'Recycler', 'EQORE'], ['Site restoration sign-off', 'Owner', 'Customer']]
};

const ERP_TEXT = `Emergency Response Plan – Battery Energy Storage System
MIT Dome Building · 77 Massachusetts Avenue, Cambridge, MA · Prepared by Granite EPC · Rev 0

1. System description
250 kW / 760 kWh lithium iron phosphate (LFP) battery energy storage system.
Equipment: 1 × Gotion EDGE760 battery enclosure, 2 × Dynapower MPS125 inverters and a 500 kVA isolation transformer on an exterior concrete pad across the private driveway from the main building.

2. Emergency contacts
Facility manager: MIT Dome Building facilities desk · (617) 555-0142
EQORE 24/7 monitoring: (617) 555-0199
Granite EPC on-call: (617) 555-0123
Fire department: 911

3. Emergency shutdown
1. Open the 400 A battery system disconnect on the pad (primary means of disconnect).
2. Open the 600 A battery system breaker in the main distribution panel, electrical room.
3. Call EQORE monitoring to confirm the system is offline.

4. Fire protection
The battery enclosure includes integrated aerosol fire suppression.
Fire alarm and annunciation are reported to EQORE monitoring.

5. Fire department response
Do not open the battery enclosure doors during an event.
Contact EQORE monitoring for system status before approaching.

6. Site map
See attached site map for equipment and disconnect locations.

7. Training
Facility staff will be trained on this plan before energization.`;

const MIT_FACTS = `System: 250 kW / 760 kWh LFP. 1 × Gotion EDGE760 enclosure, 2 × Dynapower MPS125 inverters, 500 kVA isolation transformer on an exterior pad across the private driveway.
Plan set Rev B (stamped Sep 28).
ESS-1.0 site plan: setbacks, both disconnect locations, fire department access path.
ESS-4.1 and ESS-6.2: 400 A battery system breaker. ESS-13.0 one-line shows 600 A (conflict, open with engineer of record).
ESS-13.0: primary disconnect on the pad. Fire suppression = aerosol + dry pipe sprinkler + pack immersion.
ESS-5.0: conduit trench depth ≥ 24 in.
ESS-18.0 hazard signage. ESS-19.0 fire suppression design. ESS-20.0 NFPA 855 compliance summary.
Utility export limit revised in relay settings v2 (Oct 27).`;

function buildSeed() {
  let n = 0;
  const id = (p) => p + '-' + (++n).toString(36);
  const at = (s) => s; // dates are stored as display text in seeded notes
  const doc = (d, extra) => Object.assign({ id: id('d'), name: d[0], ref: d[1], owner: d[2], status: d[3] || 'notdue', note: d[4] || '—', history: [] }, extra || {});
  const packet = (def, statuses, extra) => {
    const docs = def[6].map((d, i) => {
      const s = statuses ? statuses[i] : null;
      return doc([d[0], s && s[2] ? s[2] : d[1], s && s[3] ? s[3] : d[2], s ? s[0] : 'notdue', s ? s[1] : '—']);
    });
    return Object.assign({ id: id('p'), name: def[0], phase: def[1], kind: def[2], to: def[3], owner: def[4], blurb: def[5], docs }, extra || {});
  };
  const std = (name) => STANDARD_PACKETS.find((p) => p[0] === name);
  const partners = (epc, epcContact, epcEmail, customerName) => [
    { label: 'EQORE', name: 'EQORE', role: 'Owner', contact: 'EQORE Engineering', email: 'engineering@eqore.example' },
    { label: 'Granite EPC', name: epc, role: 'EPC', contact: epcContact, email: epcEmail },
    { label: 'Engineer of record', name: 'Ridgeline Engineering', role: 'Engineer of record', contact: 'Priya Nair', email: 'pnair@ridgeline-eng.example' },
    { label: 'Customer', name: customerName, role: 'Facility', contact: 'Facilities team', email: 'facilities@customer.example' },
    { label: 'Utility', name: 'Utility', role: 'View only', contact: 'Interconnection desk', email: 'interconnection@utility.example' }
  ];

  // ---------- MIT Dome Building: the detailed project from the prototype ----------
  const A = (note) => ['approved', note];
  const R = (note) => ['ready', note];
  const mit = {
    id: 'mitdome', name: 'MIT Dome Building', address: '77 Massachusetts Avenue, Cambridge, MA 02139', size: '250 kW / 760 kWh', epc: 'Granite EPC',
    facts: MIT_FACTS, stage: 'Construction', partners:partners('Granite EPC', 'Dana Whitfield', 'dwhitfield@granite-epc.example', 'MIT Dome Building'), order: 1,
    packets: [
      packet(std('Site assessment & design'), [A('Aug 12'), A('Aug 12'), A('Aug 15'), A('Aug 22'), A('Aug 29'), A('Sep 5'), ['approved', 'Sep 28', 'Stamped, Rev B']], { closed: true, blurb: 'Closed Sep 28 when the plan set was stamped. Kept here for reference.' }),
      packet(std('Building & electrical permit'), [A('v1 · Oct 2'), A('v1 · Oct 2'), ['approved', 'Rev B · Jan 12', 'All sheets'], A('v2 · Sep 28'), A('v1 · Sep 28'), A('v1 · Sep 28'), A('Sep 20'), A('Sep 20'), A('Exp. 2027'), A('Exp. Jun 2027'), A('Sep 18')], { blurb: 'Approved on first submission. Approval letter and stamped set are filed here.' }),
      packet(std('Fire marshal (NFPA 855)'), [R('Reviewed by EQORE · Oct 20'), R('Rev B'), R('Rev B'), R('Sep 20'), R('Sep 20'), R('Rev B'), R('Oct 21'), R('Reviewed Oct 22'), R('v2 · reviewed Nov 2'),
        ['action', 'Uploaded today 9:40 AM · AI found 3 issues'], ['missing', 'Requested Nov 4']],
        { blurb: 'Granite EPC tried to submit yesterday at 4:12 PM. The Vault held it until every document is in and reviewed.' }),
      packet(std('Utility interconnection'), [A('Aug 30'), ['approved', 'Rev B'], ['approved', 'Rev B'], A('Aug 30'), A('Sep 4'), ['denied', 'Returned Oct 20: export limit · replaced by v2', 'Settings file v1'], A('Oct 9'), A('Oct 11'), ['notdue', 'Not yet scheduled'], ['notdue', '—']],
        { blurb: 'The witness test and permission to operate come after the town signs off on the final inspection.' }),
      packet(std('Construction & inspections'), [A('Oct 23'), R('Oct 24'), A('Passed Nov 3'), R('Oct 27'), R('Reviewed Nov 5'), R('Re-dug to 26 in · reviewed Nov 6'), R('Reviewed through Nov 6'), ['missing', 'None filed yet'], R('1 change'), ['submitted', 'Requested Nov 5'], ['notdue', '—'], ['notdue', '—']],
        { blurb: 'Final electrical inspection request unlocks when every item is in.' }),
      packet(std('Commissioning & energization')),
      packet(std('Maintenance & warranty'), [R('Reviewed Nov 5'), R('Exp. 2027'), null, null, null, null, ['notdue', 'Starts after energization'], ['notdue', 'Starts after energization'], ['notdue', 'Starts after energization']].map((s) => s || ['notdue', '—'])),
      packet(std('Operations & performance')),
      { id: id('p'), name: 'Driveway trench & access', phase: 'Construction', kind: 'Custom packet', to: 'Property owner', owner: 'Granite EPC', custom: true,
        blurb: 'Custom packet added for this site because the conduit crosses a private driveway.',
        docs: [doc(['Driveway crossing approval', 'Signed by owner', 'Customer', 'approved', 'Oct 15']), doc(['Traffic control plan for loading dock', 'Site sketch', 'Granite EPC', 'missing', 'Due before trenching']), doc(['Driveway restoration sign-off', 'After backfill', 'Customer', 'notdue', '—'])] }
    ]
  };
  // Interconnection: corrected relay settings v2 sits right after the denied v1
  const ic = mit.packets[3];
  ic.docs[5].superseded = true;
  ic.docs[5].name = 'Protection & relay settings v1';
  ic.docs.splice(6, 0, doc(['Protection & relay settings v2', 'Revised export limit', 'Engineer of record', 'submitted', 'Resubmitted Oct 27']));
  // Building permit: approval letter on file
  mit.packets[1].docs.push(doc(['Permit approval letter', 'Issued by town', 'Town Building Dept', 'approved', 'Oct 16'], { letter: true }));
  // Fire marshal ERP: the uploaded plan with its AI pre-review
  const erp = mit.packets[2].docs[9];
  erp.hasText = true;
  erp.file = { name: 'MIT-Dome-ERP-Rev0.txt', type: 'text/plain', size: ERP_TEXT.length, at: 'Today 9:40 AM', textOnly: true };
  erp.history = [{ at: 'Today 9:40 AM', text: 'Granite EPC uploaded Rev 0' }];
  erp.review = {
    at: 'Today 9:41 AM', model: 'demo',
    summary: 'Checked against the fire marshal’s emergency planning expectations for battery systems, plan set Rev B, and the other documents in this packet. Found issues the fire marshal is likely to send back.',
    flags: [
      { n: 1, severity: 'high', title: 'Breaker rating doesn’t match the plan set', ref: 'Section 3 · ESS-4.1', quote: '600 A battery system breaker', detail: 'This plan says 600 A. ESS-4.1 and ESS-6.2 specify a 400 A breaker, while ESS-13.0 says 600 A. Confirm with the engineer of record so the plan set and this document agree.' },
      { n: 2, severity: 'medium', title: 'Fire suppression description is incomplete', ref: 'Section 4 · ESS-13.0', quote: 'integrated aerosol fire suppression', detail: 'Lists aerosol suppression only. ESS-13.0 lists aerosol, a dry pipe sprinkler system and pack immersion. Responders will need to know where the dry pipe connection is.' },
      { n: 3, severity: 'medium', title: 'Site map is referenced but not attached', ref: 'Section 6 · ESS-1.0', quote: 'See attached site map', detail: 'No attachment was uploaded. Attach the ESS-1.0 site plan with both disconnects and the fire department access path marked.' }
    ],
    passed: ['System size, chemistry and equipment match the plan set (ESS-13.0)', 'Primary disconnect location matches ESS-13.0', 'Fire department access plan is already in this packet']
  };
  mit.activity = [
    { at: 'Today 9:41 AM', text: 'AI pre-review of Emergency response plan: 1 high and 2 medium issues flagged for EQORE review.', tone: 'warn' },
    { at: 'Today 9:40 AM', text: 'Granite EPC uploaded Emergency response plan to Fire marshal (NFPA 855).', tone: 'info' },
    { at: 'Yesterday 4:12 PM', text: 'Submission to Town Fire Prevention blocked: Emergency response plan and Hazard mitigation analysis not ready.', tone: 'bad' },
    { at: 'Nov 6', text: 'Trench depth photos reviewed and marked ready after re-dig to 26 in (ESS-5.0 requires 24 in).', tone: 'ok' },
    { at: 'Oct 11', text: 'Utility issued Approval to construct; filed to Utility interconnection.', tone: 'ok' }
  ];

  // ---------- The rest of the portfolio, generated from the standard packet set ----------
  const gen = (meta, phaseIdx, tweak) => {
    const p = Object.assign({ facts: '', stage: PHASES[phaseIdx], activity: [],partners: partners(meta.epc, 'Project lead', 'pm@' + meta.epc.toLowerCase().replace(/[^a-z]+/g, '-') + '.example', meta.name) }, meta);
    p.packets = STANDARD_PACKETS.map((def) => {
      const ph = PHASES.indexOf(def[1]);
      const st = def[6].map((d, i) => {
        if (ph < phaseIdx) return ['approved', 'Filed'];
        if (ph === phaseIdx) return i < Math.ceil(def[6].length * 0.6) ? ['ready', 'Reviewed'] : ['notdue', '—'];
        return ['notdue', '—'];
      });
      return packet(def, st, ph < phaseIdx && ph === 0 ? { closed: true } : {});
    });
    tweak(p, (name) => p.packets.find((x) => x.name === name));
    return p;
  };
  const set = (pk, docName, status, note, owner) => { const d = pk.docs.find((x) => x.name === docName); d.status = status; d.note = note; if (owner) d.owner = owner; };
  const harbor = gen({ id: 'harbor', name: 'Harbor Logistics DC', address: '410 Terminal Street, Charlestown, MA', size: '125 kW / 380 kWh', epc: 'Coastline Electric', order: 2 }, 1, (p, pk) => {
    const b = pk('Building & electrical permit');
    b.docs.forEach((d) => { if (d.status === 'notdue') { d.status = 'submitted'; d.note = 'Submitted Oct 28'; } if (d.status === 'ready') { d.status = 'submitted'; d.note = 'Submitted Oct 28'; } });
    set(b, 'Structural calcs: slab, beams, anchors, welds', 'denied', 'Returned Nov 3: structural calcs not included');
    p.activity = [{ at: 'Nov 3', text: 'Town Building Dept returned the building permit: structural calcs not included.', tone: 'bad' }];
  });
  const merrimack = gen({ id: 'merrimack', name: 'Merrimack Plastics', address: '22 Mill Road, Lowell, MA', size: '250 kW / 500 kWh', epc: 'Granite EPC', order: 3 }, 4, (p, pk) => {
    const c = pk('Commissioning & energization');
    set(c, 'Inverter & battery startup report', 'missing', 'Requested from EPC Nov 2', 'Granite EPC');
    set(c, 'Fire suppression & annunciation test', 'missing', 'Requested Nov 2');
  });
  const riverside = gen({ id: 'riverside', name: 'Riverside Cold Chain', address: '9 River Street, Haverhill, MA', size: '250 kW / 760 kWh', epc: 'Valley Power Co.', order: 4 }, 2, (p, pk) => {
    const u = pk('Utility interconnection');
    set(u, 'Protection & relay settings', 'missing', 'With engineer of record');
    set(u, 'Signed interconnection agreement', 'missing', 'Waiting on utility countersignature', 'Utility');
  });
  const bay = gen({ id: 'baystate', name: 'Bay State Brewing', address: '300 Canal Street, Lawrence, MA', size: '125 kW / 380 kWh', epc: 'Coastline Electric', order: 5 }, 5, (p, pk) => {
    const m = pk('Maintenance & warranty');
    set(m, 'Battery warranty registration', 'missing', 'Due in 5 days');
    set(m, 'Inverter warranty registration', 'missing', 'Due in 5 days');
  });
  const quincy = gen({ id: 'quincy', name: 'Quincy Medical Supply', address: '1 Granite Way, Quincy, MA', size: '250 kW / 500 kWh', epc: 'TBD', order: 6 }, 0, () => {});

  return { projects: [mit, harbor, merrimack, riverside, bay, quincy], texts: { [erp.id]: ERP_TEXT } };
}
