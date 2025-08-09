// js/main.js (stripped to essentials)
const dogImg = document.getElementById('dog');
const dogTurb = document.getElementById('dog-turb');
const dogDisplace = document.getElementById('dog-displace');
const spawnRoot = document.getElementById('spawn-root');

// Dog distortion on hover/mouse proximity
if (dogImg && dogTurb && dogDisplace) {
  let animId = null;
  let targetScale = 0;
  let baseFreq = 0.006;
  let seed = 1;

  function animateDistort() {
    const currentScale = parseFloat(dogDisplace.getAttribute('scale')) || 0;
    const nextScale = currentScale + (targetScale - currentScale) * 0.12;
    dogDisplace.setAttribute('scale', nextScale.toFixed(2));

    seed += 0.015 * (nextScale / 10);
    dogTurb.setAttribute('seed', seed.toFixed(2));
    dogTurb.setAttribute('baseFrequency', (baseFreq + nextScale * 0.0006).toFixed(4));

    animId = requestAnimationFrame(animateDistort);
  }

  function updateTargetFromPointer(e) {
    const rect = dogImg.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    if (inside) {
      const dx = (x - rect.left) / rect.width - 0.5;
      const dy = (y - rect.top) / rect.height - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      targetScale = 12 * (0.9 - Math.min(0.9, dist));
    } else {
      targetScale = 0;
    }
    if (!animId) animId = requestAnimationFrame(animateDistort);
  }

  function resetTarget() { targetScale = 0; }

  document.addEventListener('mousemove', updateTargetFromPointer);
  dogImg.addEventListener('mouseleave', resetTarget);
}

// Spawn relics/constellations inspired by reference site
if (spawnRoot) {
  const assets = [
    // Constellations
    'resources/telas/img/constellations/the_bloom.png',
    'resources/telas/img/constellations/the_branch.png',
    'resources/telas/img/constellations/the_cacti.png',
    'resources/telas/img/constellations/the_center.png',
    'resources/telas/img/constellations/the_change.png',
    'resources/telas/img/constellations/the_figure.png',
    'resources/telas/img/constellations/the_door.png',
    'resources/telas/img/constellations/the_drum.png',
    'resources/telas/img/constellations/the_duet.png',
    'resources/telas/img/constellations/the_eternal.png',
    'resources/telas/img/constellations/the_eye.png',
    'resources/telas/img/constellations/the_flame.png',
    'resources/telas/img/constellations/the_heart.png',
    'resources/telas/img/constellations/the_hold.png',
    'resources/telas/img/constellations/the_insect.png',
    'resources/telas/img/constellations/the_knot.png',
    'resources/telas/img/constellations/the_ladder.png',
    'resources/telas/img/constellations/the_leaf.png',
    'resources/telas/img/constellations/the_limit.png',
    'resources/telas/img/constellations/the_line.png',
    'resources/telas/img/constellations/the_lovestory.png',
    'resources/telas/img/constellations/the_lungs.png',
    'resources/telas/img/constellations/the_medicine.png',
    'resources/telas/img/constellations/the_memory.png',
    'resources/telas/img/constellations/the_mirror.png',
    'resources/telas/img/constellations/the_mound.png',
    'resources/telas/img/constellations/the_oblique.png',
    'resources/telas/img/constellations/the_ocean.png',
    'resources/telas/img/constellations/the_ornament.png',
    'resources/telas/img/constellations/the_pi.png',
    'resources/telas/img/constellations/the_portal.png',
    'resources/telas/img/constellations/the_prayer.png',
    'resources/telas/img/constellations/the_mark.png',
    // Relics
    'resources/telas/img/relics/relic_of_migritude.gif',
    'resources/telas/img/relics/relic_of_trying.png',
    'resources/telas/img/relics/relic_adrift.gif',
    'resources/telas/img/relics/relic_of_the_unknown.gif',
    'resources/telas/img/relics/relic_of_arrangements.png',
    'resources/telas/img/relics/relic_of_many_selves.gif',
    'resources/telas/img/relics/relic_of_pilgrims.gif',
    'resources/telas/img/relics/relic_of_guardians.gif',
    'resources/telas/img/relics/relic_of_those_who_await.gif',
    'resources/telas/img/relics/relic_of_chance.gif',
    'resources/telas/img/relics/relic_of_tracks.gif',
    'resources/telas/img/relics/relic_of_the_sudden.gif'
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function spawnOne() {
    const img = document.createElement('img');
    img.decoding = 'async';
    img.loading = 'lazy';
    img.src = pick(assets);
    img.className = 'spawn-item';
    const sizeBase = Math.random() * 8 + 6; // vw
    img.style.width = sizeBase + 'vw';
    img.style.left = Math.round(Math.random() * 90 + 2) + 'vw';
    img.style.top = Math.round(Math.random() * 80 + 8) + 'vh';
    const anims = ['float-a', 'float-b', 'float-c'];
    const anim = pick(anims);
    const dur = (Math.random() * 12 + 14).toFixed(1) + 's';
    const delay = (Math.random() * 4 - 2).toFixed(1) + 's';
    img.style.animation = `${anim} ${dur} ease-in-out ${delay} 1 both`;
    spawnRoot.appendChild(img);
    const ttl = parseFloat(dur) * 1000 + 3000;
    setTimeout(() => img.remove(), ttl);
  }

  // steady spawning cadence
  setInterval(spawnOne, 1600);
  // warm start
  for (let i = 0; i < 6; i++) setTimeout(spawnOne, i * 350);
}
