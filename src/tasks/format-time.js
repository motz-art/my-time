function formatTime(ms, short) {
  ms |= 0;

  ms = Math.round(ms / 1000) | 0;

  const minus = ms < 0;
  if (minus) {
    ms = -ms;
  }
  const minusStr = minus ? '-' : '';

  const d = Math.floor(ms / 86400) | 0;
  ms -= (d * 86400) | 0;
  const ds = d ? d.toString(10) + '.' : '';

  const h = Math.floor(ms / 3600) | 0;
  ms -= (h * 3600) | 0;
  const hStr = d ? h.toString(10).padStart(2, '0') + ':' : h ? h.toString(10) + ':' : '';

  const m = Math.floor(ms / 60) | 0;
  ms -= (m * 60) | 0;
  let mStr = m.toString(10).padStart(2, '0');
  if (short) {
    mStr += 'm';
  } else {
    mStr += ':';
  }

  const s = ms;
  let sStr = s.toString(10).padStart(2, '0');
  if (short) {
    sStr = '';
  }

  return [minusStr, ds, hStr, mStr, sStr].join('');
}

export default formatTime;
