import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

export class Scene {
    constructor(canvasElement, controlsAreaElement, imgSrc, initialEntourageAngle, points) {
        this.imgSrc = imgSrc;
        this.canvasElement = canvasElement;
        this.controlsAreaElement = controlsAreaElement;
        this.initialEntourageAngle = initialEntourageAngle;
        this.canvasContainer = canvasElement.parentNode;
        this.pionts = points;

        this.animate = this.animate.bind(this);

        this.initRenderer();
        this.initScene();
        this.initCamera();

        this.initMaterials()
            .then(() => {
                // console.log('points',this.pionts);
                this.initEntourage();
                this.initControls();
                window.requestAnimationFrame(this.animate);
                setTimeout(this.onLoad);
                setTimeout(this.updateSceneSize,1000);
                this.initMarkers(this.pionts);
            });


        this.updateSceneSize();
        this.updateSceneSize = this.updateSceneSize.bind(this);
        window.addEventListener('resize', this.updateSceneSize, false);

        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    }

    get size() {
        return {
            width: this.canvasContainer.clientWidth,
            height: this.canvasContainer.clientHeight
        };
    }

    filterPoints (filteredArr) {
        this.pionts.forEach(point => {
            if(filteredArr.includes(point)) { 
                point.marker.visible = true
            } else {
                point.marker.visible = false
            }
        })
    }

    onDocumentMouseDown(event) {
        
        event.preventDefault();
        var vector = new THREE.Vector3(
            (event.clientX / window.innerWidth) * 2 - 1,
          - (event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        vector.unproject(this.camera);
    
        var ray = new THREE.Raycaster(this.camera.position, 
                                 vector.sub(this.camera.position).normalize(), 0, 900);

        var intersects = ray.intersectObjects(this.scene.children);
    
        if (intersects.length > 0) {
            return intersects[0].object.usrData
            // console.log(intersects[0].object.usrData);
            // intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        }
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

        this.renderer = renderer;

        let maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
        if (maxAnisotropy > 8) maxAnisotropy = 8;
        this.maxAnisotropy = maxAnisotropy;
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
        let orbitControls = new THREE.OrbitControls(this.camera, this.controlsAreaElement);
        orbitControls.name = 'orbitControls';

        // orbitControls.target.set(0, 0, 0);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.15;

        orbitControls.rotateSpeed = -0.05;

        orbitControls.enableZoom = false;
        orbitControls.enableKeys = false;
        orbitControls.enablePan = false;

        this.controls = orbitControls;
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
        let segments = 44;
        if (this.maxAnisotropy >= 8) {
            segments = 96;
        }

        let geometry = new THREE.SphereGeometry(1000, segments, Math.floor(segments / 1.5));
        geometry.scale(-1, 1, 1);

        let material = new THREE.MeshBasicMaterial({map: this.texture});

        this.entourage = new THREE.Mesh(geometry, material);

        this.entourage.rotation.y = Math.PI / 2;
        if (this.initialEntourageAngle) {
            this.entourage.rotation.y += this.initialEntourageAngle / 180 * Math.PI;
        }

        this.scene.add(this.entourage);
    }

    initMaterials() {
        return new Promise((resolve, reject) => {
            let loader = new THREE.TextureLoader();
            loader.setCrossOrigin('');

            loader.load(this.imgSrc,
                texture => {
                    this.texture = texture;
                    this.texture.anisotropy = this.maxAnisotropy;
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

    initMarkers(points) {
        let geometry = new THREE.PlaneGeometry(1, 1, 1);
        let textureLoader = new THREE.TextureLoader();

        textureLoader.load('static/img/map-mark-w.png',
            (texture) => {
                // texture.minFilter = THREE.LinearFilter;
                points.forEach((element, index) => {
                    element.marker = new THREE.Mesh(
                        geometry,
                        new THREE.MeshBasicMaterial({
                            map: texture,
                            transparent: true,
                            color: this.getColor(element.color),
                            depthWrite: false
                        })
                    );
                    this.scene.add(element.marker);
                    element.marker.position.set(element.x, element.z, element.y);
                    element.marker.rotation.y = element.rotation;
                    element.marker.cursor = 'pointer';
                    element.marker.usrData = element.popup;
                    element.marker.name = 'marker_' + index;
                });

            },
            null,
            null
        );

        // fore debug purpose
        window.THREE = THREE;
        window.scene = this.scene;
    }

    getColor(colorCode) {
        let result = {
            w: '#fff',      // white
            r: '#ef5939',   // red
            b: '#306ad0',   // blue
            g: '#2A622E',   // green
            lb: '#3498db',  // light blue
            p: '#E8808A',   // pink
            pur: '#BD7CB7', // purple
            y: '#ffe598'    // yellow
        };

        return result[colorCode] || '#fff';
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

        this.controls.dispose();

        window.cancelAnimationFrame(this.req);

        window.removeEventListener('resize', this.updateSceneSize, false);
    }
}