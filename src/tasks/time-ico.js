/* eslint-env browser */

function draw({ remainingTime, totalTime, remainingTimeFormatted }, options) {
  options = options || {};
  const canvas = document.createElement('canvas');
  canvas.width = options.width || 100;
  canvas.height = options.height || 100;
  const ctx = canvas.getContext('2d');

  const startDeg = ((30 - 270) / 360) * 2 * Math.PI;
  const endDeg = (60 / 360) * 2 * Math.PI;
  const timePercent = (remainingTime / totalTime) % 1;
  let position = timePercent * (endDeg - startDeg) + startDeg;
  if (remainingTime < 0) {
    position = endDeg;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  const radiusBase = Math.min(canvas.width, canvas.height) / 2;
  const bigRadius = radiusBase * 0.95;
  const smallRadius = radiusBase * 0.75;

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, bigRadius, startDeg, endDeg, false);
  ctx.arc(canvas.width / 2, canvas.height / 2, smallRadius, endDeg, startDeg, true);
  ctx.lineTo(
    canvas.width / 2 + Math.cos(startDeg) * bigRadius,
    canvas.height / 2 + Math.sin(startDeg) * bigRadius
  );
  ctx.fillStyle = '#888';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, bigRadius, startDeg, position, false);
  ctx.arc(canvas.width / 2, canvas.height / 2, smallRadius, position, startDeg, true);
  ctx.lineTo(
    canvas.width / 2 + Math.cos(startDeg) * bigRadius,
    canvas.height / 2 + Math.sin(startDeg) * bigRadius
  );
  ctx.fillStyle = `hsl(${Math.max(timePercent, 0) * 120}, 80%,50%)`;
  ctx.fill();

  ctx.font = `${Math.round(canvas.height * 0.2)}px Arial`;
  const size = ctx.measureText(remainingTimeFormatted);

  ctx.fillText(
    remainingTimeFormatted,
    (canvas.width - size.width) / 2,
    canvas.height / 2 + 5
  );

  return canvas.toDataURL();
}

export default draw;
