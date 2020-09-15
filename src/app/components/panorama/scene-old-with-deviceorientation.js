import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/controls/DeviceOrientationControls';

export class Scene {
    constructor(canvasElement, imgSrc) {
        this.imgSrc = imgSrc;
        this.canvasElement = canvasElement;
        this.canvasContainer = canvasElement.parentNode;

        this.animate = this.animate.bind(this);

        this.initRenderer();
        this.initScene();
        this.initCamera();

        this.initMaterials()
            .then(() => {
                this.initEntourage();
                this.initControls();
                setTimeout(this.onLoad);
            });


        this.updateSceneSize();
        this.updateSceneSize = this.updateSceneSize.bind(this);
        window.addEventListener('resize', this.updateSceneSize, false);

        window.requestAnimationFrame(this.animate);

        this.onKeyDown = this.onKeyDown.bind(this);
        window.document.addEventListener('keydown', this.onKeyDown, false);
        this.onKeyUp = this.onKeyUp.bind(this);
        window.document.addEventListener('keyup', this.onKeyUp, false);
    }

    get size() {
        return {
            width: this.canvasContainer.clientWidth,
            height: this.canvasContainer.clientHeight
        };
    }

    updateSceneSize() {
        this.canvasElement.setAttribute('width', this.size.width);
        this.canvasElement.setAttribute('height', this.size.height);

        this.renderer.setSize(this.size.width, this.size.height);

        this.camera.aspect = this.size.width / this.size.height;
        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        let renderer = new THREE.WebGLRenderer({
            canvas: this.canvasElement,
            antialias: true,
            // sortObjects: false,
            alpha: true,
        });

        // renderer.capabilities.maxTextureSize = 8192;
        // console.log(renderer);

        this.renderer = renderer;
    }

    initScene() {
        let scene = new THREE.Scene();


        this.scene = scene;
    }

    initCamera() {
        let camera = new THREE.PerspectiveCamera(45, this.size.width / this.size.height, 1, 10000);

        camera.position.z = -1;

        this.camera = camera;

        // let axisHelper = new THREE.AxisHelper(50);
        // axisHelper.position.set(-200, -200, -200);
        // this.scene.add(axisHelper);
    }

    initControls() {
        let orbitControls = new THREE.OrbitControls(this.camera);
        orbitControls.name = 'orbitControls';

        // orbitControls.target.set(0, 0, 0);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.15;

        orbitControls.rotateSpeed = -0.05;

        orbitControls.enableZoom = false;
        orbitControls.enableKeys = false;
        orbitControls.enablePan = false;

        this.orbitControls = orbitControls;

        this.setControls();

        //////

        this.deviceOrientationControls = null;
        let that = this;
        let deviceorientationCalls = -1;
        window.addEventListener("devicemotion", function handleOrientation(event) {
            deviceorientationCalls++;
            if (!deviceorientationCalls) return;
            if(!event.rotationRate.alpha) return;

            let deviceOrientationControls = new THREE.DeviceOrientationControls(that.camera);
            deviceOrientationControls.name = 'deviceOrientationControls';

            that.deviceOrientationControls = deviceOrientationControls;
            that.deviceOrientationControls.initHorisontalAngle = -1.591;
            setTimeout(() => {
                that.deviceOrientationControls.initHorisontalAngle = that.camera.rotation.y;
            }, 1500);

            that.setControls();

            if (that.deviceOrientationControlsInited && typeof that.deviceOrientationControlsInited == 'function') {
                that.deviceOrientationControlsInited();
            }

            that.hasDeviceOrientationControls = true;

            window.removeEventListener("devicemotion", handleOrientation, false);
        }, false);
    }

    setControls() {
        if (this.deviceOrientationControls) {
            this.controls = this.deviceOrientationControls;
        } else if (this.orbitControls) {
            this.controls = this.orbitControls;
        }
    }

    changeControls() {
        if (!this.deviceOrientationControls && !this.orbitControls) return;

        if (this.controls.name === 'deviceOrientationControls') {

            this.controls = this.orbitControls;

            let distance = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).length();
            let normal = new THREE.Vector3(0,0,-1).applyQuaternion(this.camera.quaternion);
            this.controls.target = new THREE.Vector3().add(this.camera.position).add(normal.setLength(distance));

        } else if (this.controls.name === 'orbitControls') {

            let lookAtVector = new THREE.Vector3(0,0, -1);
            lookAtVector.applyQuaternion(this.camera.quaternion);

            console.log(this.orbitControls.getAzimuthalAngle());
            console.log(this.deviceOrientationControls.initHorisontalAngle);
            console.log(lookAtVector);

            this.deviceOrientationControls.alphaOffset = this.orbitControls.getAzimuthalAngle() - this.deviceOrientationControls.initHorisontalAngle;
            // this.deviceOrientationControls.alphaOffset = this.orbitControls.getAzimuthalAngle() - lookAtVector.y;
            // console.log(this.deviceOrientationControls.alphaOffset);
            //
            this.controls = this.deviceOrientationControls;
        }

        // console.log(this.controls.name);
    }

    animate() {
        if (this.controls && this.controls.enabled) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);

        this.req = window.requestAnimationFrame(this.animate);

        if (this.controls && this.controls.name === 'orbitControls') {
            if (this.controls.moveUp && this.camera.position.y > -1) {
                this.camera.position.y -= 0.005;
            } else if (this.controls.moveDown && this.camera.position.y < 1) {
                this.camera.position.y += 0.005;
            }
        }
    }

    initEntourage() {
        let segments = 96;

        let geometry = new THREE.SphereGeometry(1000, segments, Math.floor(segments / 1.5));
        geometry.scale(-1, 1, 1);

        let material = new THREE.MeshBasicMaterial({map: this.texture});

        this.entourage = new THREE.Mesh(geometry, material);

        this.entourage.rotation.y = 1.87;

        this.scene.add(this.entourage);
    }

    initMaterials() {
        return new Promise((resolve, reject) => {
            let loader = new THREE.TextureLoader();
            loader.setCrossOrigin('');

            loader.load(this.imgSrc,
                texture => {
                    this.texture = texture;
                    resolve();
                },
                null,
                err => {
                    console.error(err);
                    reject(err);
                }
            );
        });
    }

    onLoad() {}

    dispose() {
        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            const object = this.scene.children[i];
            if (object.type === 'Mesh') {
                object.geometry.dispose();
                object.material.dispose();
                this.scene.remove(object);
            }
        }

        this.renderer.dispose();

        if (this.orbitControls) this.orbitControls.dispose();
        if (this.deviceOrientationControls) this.deviceOrientationControls.dispose();

        window.cancelAnimationFrame(this.req);

        window.removeEventListener('resize', this.updateSceneSize, false);
        window.document.removeEventListener('keydown', this.onKeyDown, false);
        window.document.removeEventListener('keyup', this.onKeyUp, false);
    }

    onKeyDown(event) {
        if (this.controls.name !== 'orbitControls') return;

        if (event.keyCode === 37 || event.keyCode === 39) {
            this.controls.enableRotate = false;
            this.controls.autoRotate = true;
        }
        if (event.keyCode === 37) {
            this.controls.autoRotateSpeed = -0.9;
        } else if (event.keyCode === 39) {
            this.controls.autoRotateSpeed = 0.9;
        }

        if (event.keyCode === 38) {
            this.controls.moveUp = true;
        }
        if (event.keyCode === 40) {
            this.controls.moveDown = true;
        }
    }

    onKeyUp(event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            this.controls.enableRotate = true;
            this.controls.autoRotate = false;
        }

        if (event.keyCode === 38) {
            this.controls.moveUp = false;
        }
        if (event.keyCode === 40) {
            this.controls.moveDown = false;
        }
    }
}