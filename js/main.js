(function loadScene() {
	let canvas, gl, vp_size, progDraw, bufObj = {}, mousepos = [0, 0], scaleFactor = 1;

	async function loadShaderFile(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to load shader: ${url}`);
		}
		return await response.text();
	}

	async function initScene() {
		canvas = document.getElementById("bg-canvas");
		gl = canvas.getContext("experimental-webgl");
		if (!gl) return;

		window.addEventListener("mousemove", (e) => {
			mousepos = [e.clientX, e.clientY];
		});

		// Add scroll event listener
		// window.addEventListener("wheel", (event) => {
		// 	// Adjust scaleFactor based on scroll delta
		// 	scaleFactor += event.deltaY * -0.001;
		// 	scaleFactor = Math.max(0.1, Math.min(scaleFactor, 5.0)); // Clamp to avoid extreme values

		// 	// Update the uniform
		// 	if (progDraw) {
		// 		const scaleFactorLocation = gl.getUniformLocation(progDraw, "scaleFactor");
		// 		gl.uniform1f(scaleFactorLocation, scaleFactor);
		// 	}
		// });

		// Load shaders
		const vertexShaderSource = await loadShaderFile("js/bg.vert");
		const fragmentShaderSource = await loadShaderFile("js/bg.frag");

		progDraw = gl.createProgram();
		const shaders = [
			{ type: gl.VERTEX_SHADER, source: vertexShaderSource },
			{ type: gl.FRAGMENT_SHADER, source: fragmentShaderSource }
		];

		shaders.forEach(({ type, source }) => {
			const shaderObj = gl.createShader(type);
			gl.shaderSource(shaderObj, source);
			gl.compileShader(shaderObj);

			if (!gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)) {
				console.error(`Shader compilation error: ${gl.getShaderInfoLog(shaderObj)}`);
				gl.deleteShader(shaderObj);
			} else {
				gl.attachShader(progDraw, shaderObj);
			}
		});

		gl.linkProgram(progDraw);
		if (!gl.getProgramParameter(progDraw, gl.LINK_STATUS)) {
			console.error(`Program linking error: ${gl.getProgramInfoLog(progDraw)}`);
			return;
		}

		progDraw.inPos = gl.getAttribLocation(progDraw, "inPos");
		progDraw.iTime = gl.getUniformLocation(progDraw, "iTime");
		progDraw.iMouse = gl.getUniformLocation(progDraw, "iMouse");
		progDraw.iResolution = gl.getUniformLocation(progDraw, "iResolution");
		progDraw.movementAmount = gl.getUniformLocation(progDraw, "movementAmount");
		progDraw.scaleFactor = gl.getUniformLocation(progDraw, "scaleFactor");
		gl.useProgram(progDraw);

		const pos = [-1, -1, 1, -1, 1, 1, -1, 1];
		const inx = [0, 1, 2, 0, 2, 3];
		bufObj.pos = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.pos);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
		bufObj.inx = gl.createBuffer();
		bufObj.inx.len = inx.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(progDraw.inPos);
		gl.vertexAttribPointer(progDraw.inPos, 2, gl.FLOAT, false, 0, 0);

		gl.enable(gl.DEPTH_TEST);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		window.onresize = resize;
		resize();
		requestAnimationFrame(render);
	}

	function resize() {
		vp_size = [window.innerWidth, window.innerHeight];
		canvas.width = vp_size[0];
		canvas.height = vp_size[1];
	}

	function render(deltaMS) {
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.uniform1f(progDraw.iTime, deltaMS / 1000.0);
		gl.uniform2f(progDraw.iResolution, canvas.width, canvas.height);
		gl.uniform1f(progDraw.movementAmount, 0.05);
		gl.uniform1f(progDraw.scaleFactor, scaleFactor);
		gl.uniform2f(progDraw.iMouse, mousepos[0], mousepos[1]);
		gl.drawElements(gl.TRIANGLES, bufObj.inx.len, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(render);
	}

	initScene().catch((error) => console.error("Failed to initialize scene:", error));
})();