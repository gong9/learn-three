// index.js
document.addEventListener("DOMContentLoaded", () => {
    const $app = document.querySelector(`#app`);
    const {
        width,
        height
    } = $app.getBoundingClientRect();
    const ctx = $app.getContext("2d");
    const $img = document.createElement("img");
    $img.onload = () => {
        ctx.drawImage($img, 0, 0);
    };
    $img.src = "../../public/gong.png";
    let isDrag = false;
    let ov = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);

    function reDraw(ctx, o, t) {
        const out = new Float32Array([
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]);
        const nv = glMatrix.mat4.multiply(out, t, o);
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.transform(nv[0], nv[4], nv[1], nv[5], nv[12], nv[13]);
        ctx.drawImage($img, 0, 0);
        ctx.restore();
        return nv;
    }

    $app.addEventListener("mousedown", (e) => {
        isDrag = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDrag) {
            return;
        }
        const {
            movementX,
            movementY
        } = e;
        const t = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            movementX, movementY, 0, 1,
        ]);
        ov = reDraw(ctx, ov, t);
    });

    document.addEventListener("mouseup", (e) => {
        isDrag = false;
    });

    $app.addEventListener("wheel", (e) => {
        const {
            clientX,
            clientY,
            deltaY
        } = e;
        const currSacle = 1 + (deltaY < 0 ? 0.1 : -0.1);
        const zoom = Math.max(currSacle > 0 ? currSacle : 1, 0.1);
        const x = clientX * (1 - zoom);
        const y = clientY * (1 - zoom);
        const t = new Float32Array([
            zoom, 0, 0, 0,
            0, zoom, 0, 0,
            0, 0, 1, 0,
            x, y, 0, 1,
        ]);
        ov = reDraw(ctx, ov, t);
    });
});