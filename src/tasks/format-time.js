function formatTime(ms, short) {
  ms |= 0;

  const minus = ms < 0;
  if (minus) {
    ms = -ms;
  }
  const minusStr = minus & (ms >= 500) ? '-' : '';

  const d = Math.floor(ms / 86400000) | 0;
  ms -= (d * 86400000) | 0;
  const ds = d ? d.toString(10) + '.' : '';

  const h = Math.floor(ms / 3600000) | 0;
  ms -= (h * 3600000) | 0;
  const hStr = d ? h.toString(10).padStart(2, '0') + ':' : h ? h.toString(10) + ':' : '';

  const m = Math.floor(ms / 60000) | 0;
  ms -= (m * 60000) | 0;
  let mStr = m.toString(10).padStart(2, '0');
  if (short) {
    mStr += 'm';
  } else {
    mStr += ':';
  }

  const s = Math.round(ms / 1000) | 0;
  let sStr = s.toString(10).padStart(2, '0');
  if (short) {
    sStr = '';
  }

  return [minusStr, ds, hStr, mStr, sStr].join('');
}

export default formatTime;
