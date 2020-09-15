import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

export class Scene {
    constructor(canvasElement, controlsAreaElement, tourConfig) {
        this.canvasElement = canvasElement;
        this.controlsAreaElement = controlsAreaElement;
        this.tourConfig = tourConfig;

        this.animate = this.animate.bind(this);

        this.fpsControls = {
            now: null,
            then: Date.now(),
            interval: 2,
            delta: null,
        };

        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.initControls();
        this.initEntourage();
        this.initTransitionTriggers();
        this.initRaycast();

        this.updateSceneSize();
        this.updateSceneSize = this.updateSceneSize.bind(this);
        window.removeEventListener('resize', this.updateSceneSize);
        window.addEventListener('resize', this.updateSceneSize);
        // window.removeEventListener('vrdisplaypresentchange', this.updateSceneSize);
        // window.addEventListener('vrdisplaypresentchange', this.updateSceneSize);

        this.initialSceneOpen = true;

        this.nearestTrigger = null;

        this.findNearestTrigger = this.findNearestTrigger.bind(this);

        this.scenesPreload()
            .then(() => {
                this.openScene(this.tourConfig.loadOnStart);
                this.animate();

                this.ready();
            });
    }

    get size() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    updateSceneSize() {
        this.canvasElement.setAttribute('width', this.size.width);
        this.canvasElement.setAttribute('height', this.size.height);

        this.renderer.setSize(this.size.width, this.size.height);

        this.camera.aspect = this.size.width / this.size.height;

        let camerafov = 60;
        if (this.size.width > 1600) camerafov = 50;
        this.camera.fov = camerafov;

        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        let renderer = new THREE.WebGLRenderer({
            canvas: this.canvasElement,
            // antialias: true,
            // sortObjects: false,
            precision: 'lowp'
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
        let camera = new THREE.PerspectiveCamera(60, this.size.width / this.size.height, 0.1, 100000);

        this.camera = camera;

        // let axisHelper = new THREE.AxisHelper(50);
        // axisHelper.position.set(-200, -200, -200);
        // this.scene.add(axisHelper);
    }

    initControls() {
        let controls = new THREE.OrbitControls(this.camera, this.controlsAreaElement);
        controls.target.set(0, 0, -1);

        controls.enableKeys = false;
        controls.enableZoom = false;

        controls.enableDamping = true;
        controls.dampingFactor = 0.15;

        controls.rotateSpeed = -0.1;

        this.controls = controls;
    }

    initEntourage() {
        let segments = 44;
        if (this.maxAnisotropy >= 8) {
            segments = 96;
        }

        let geometry = new THREE.SphereGeometry(1000, segments, Math.floor(segments / 1.5));
        geometry.scale(-1, 1, 1);

        let material = new THREE.MeshBasicMaterial();

        this.entourage = new THREE.Mesh(geometry, material);
        this.entourage.name = 'entourage';

        this.scene.add(this.entourage);


        let geometrySlave = new THREE.SphereGeometry(990, segments, Math.floor(segments / 1.5));
        geometrySlave.scale(-1, 1, 1);

        let materialSlave = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
        });

        this.entourageSlave = new THREE.Mesh(geometrySlave, materialSlave);

        this.scene.add(this.entourageSlave);
    }

    initTransitionTriggers() {
        this.actionPlane = new THREE.Mesh(
            new THREE.CircleGeometry(1000, 48),
            new THREE.MeshBasicMaterial({
                // color: 0x00ff00,
                wireframe: true,
                transparent: true,
                opacity: 0
            })
        );
        this.actionPlane.rotation.set(-Math.PI/2, 0, 0);
        this.actionPlane.position.set(0, -150, 0);
        this.actionPlane.name = 'actionPlane';
        // this.actionPlane.visible = false;
        this.scene.add(this.actionPlane);

        this.transitionTriggerPrototype = new THREE.Mesh(
            new THREE.CircleGeometry(10, 48, 0, 2 * Math.PI),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
            })
        );
    }

    initRaycast() {
        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, this.entourage.geometry.parameters.radius);
        this.pointer = new THREE.Vector2(0, 0);

        this.controlsAreaElement.removeEventListener('mousemove', this.mouseMoveHandler, false);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.controlsAreaElement.addEventListener('mousemove', this.mouseMoveHandler, false);


        let textureLoader = new THREE.TextureLoader();
        textureLoader.load('static/pano-tour/cursor.png',
            (texture) => {
                // texture.minFilter = THREE.LinearFilter;
                this.cursor = new THREE.Mesh(
                    this.transitionTriggerPrototype.geometry,
                    new THREE.MeshBasicMaterial({
                        map: texture,
                        transparent: true
                    })
                );
                this.cursor.position.z = 1;
                // this.cursor.visible = false;
                this.cursorPlane = this.actionPlane.clone();
                this.scene.add(this.cursorPlane);
                this.cursorPlane.add(this.cursor);

                this.cursor.userData.raycastDirectionDivide = this.actionPlane.position.y / this.actionPlane.geometry.parameters.radius;
                this.cursor.userData.maxDistance = this.actionPlane.geometry.parameters.radius - 2 * this.cursor.geometry.parameters.radius;
            },
            null,
            null
        );


        this.mouseDown = this.mouseDown.bind(this);
        this.controlsAreaElement.removeEventListener('mousedown', this.mouseDown, false);
        this.controlsAreaElement.addEventListener('mousedown', this.mouseDown, false);

        this.mouseUp = this.mouseUp.bind(this);
        this.controlsAreaElement.removeEventListener('mouseup', this.mouseUp, false);
        this.controlsAreaElement.addEventListener('mouseup', this.mouseUp, false);

        this.mouseMove = this.mouseMove.bind(this);
        this.controlsAreaElement.removeEventListener('mousemove', this.mouseMove, false);
        this.controlsAreaElement.addEventListener('mousemove', this.mouseMove, false);
    }

    mouseMoveHandler(event) {
        this.pointer.x = (event.clientX / this.size.width) * 2 - 1;
        this.pointer.y = - (event.clientY / this.size.height) * 2 + 1;
    }

    mouseDown(event) {
        this.canvasPotentialClick = true;
    }
    mouseMove(event) {
        this.canvasPotentialClick = false;
    }
    mouseUp(event) {
        if (this.canvasPotentialClick) {
            this.findNearestTrigger();
        }
    }

    scenesPreload() {
        this.scenes = this.tourConfig.scenes;

        return new Promise((resolve, reject) => {
            let i = 0;
            let scenesQty = Object.keys(this.scenes).length;

            for (let sceneId in this.scenes) {
                let scene = this.scenes[sceneId];

                let textureLoader = new THREE.TextureLoader();
                textureLoader.load(scene.img,
                    (texture) => {
                        scene.texture = texture;

                        if (++i >= scenesQty) {
                            resolve();
                        }
                    },
                    null,
                    null
                );
            }
        });
    }

    openScene(sceneId) {
        let scene = this.scenes[sceneId];

        if (!scene) {
            console.error('No such scene found');
            return;
        }

        this.clearActionPlane();

        this.entourage.userData.entourageAngleCorrection = scene.entourageAngleCorrection || 0;

        if (this.initialSceneOpen) {
            this.entourage.userData.initialRotate = scene.initialRotate || 0;
            this.initialSceneOpen = false;
        }

        this.entourage.rotation.y = (this.entourage.userData.entourageAngleCorrection + this.entourage.userData.initialRotate) / 180 * Math.PI;


        this.sceneTransitionAfter(sceneId);
    }

    animate() {
        this.fpsControls.now = Date.now();
        this.fpsControls.delta = this.fpsControls.now - this.fpsControls.then;

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        this.animateTransition();
        this.animateCameraAngle();
        this.animateRaycaster();

        this.fpsControls.then = this.fpsControls.now - (this.fpsControls.delta % this.fpsControls.interval);

        this.req = window.requestAnimationFrame(this.animate);
    }

    findNearestTrigger() {
        let nearestTriggerDistance = this.camera.far;

        if (this.actionPlane.children && this.actionPlane.children.length) {
            for (let i = 0; i < this.actionPlane.children.length; i++) {
                let trigger = this.actionPlane.children[i];
                let distanceToTrigger = this.cursor.position.distanceTo(trigger.position);
                trigger.visible = false;
                if (distanceToTrigger < nearestTriggerDistance && distanceToTrigger < 600) {
                    nearestTriggerDistance = distanceToTrigger;
                    this.nearestTrigger = trigger;
                }
            }
        }
    }

    clearActionPlane() {
        this.actionPlane.visible = false;
        this.cursorPlane.visible = false;
        while(this.actionPlane.children.length > 0){
            this.actionPlane.remove(this.actionPlane.children[0]);
        }
    }
    fillActionPlane(scene) {
        if (scene.transitionPoints && scene.transitionPoints.length) {
            scene.transitionPoints.forEach(point => {
                let mesh = this.transitionTriggerPrototype.clone();

                point.angle = point.angle || 0;

                point.distanceK = point.distanceK || 1;
                if (point.distanceK > 1) point.distanceK = 1;
                if (point.distanceK < 0.1) point.distanceK = 0.1;

                let vec = new THREE.Vector3(0, (this.entourage.geometry.parameters.radius - this.transitionTriggerPrototype.geometry.parameters.radius) * point.distanceK, 0);
                let axis = new THREE.Vector3(0, 0, 1);
                vec.applyAxisAngle(axis, (this.entourage.userData.initialRotate - point.angle) / 180 * Math.PI);
                mesh.position.set(vec.x, vec.y, vec.z);

                mesh.userData = point;

                this.actionPlane.add(mesh);
            });
        }
        this.actionPlane.visible = true;
        this.cursorPlane.visible = true;
    }

    animateTransition() {
        if (this.fpsControls.delta < this.fpsControls.interval) return;
        if (!this.nearestTrigger || !this.nearestTrigger.userData || !this.nearestTrigger.userData.destination) return;

        if (this.entourage.userData.transitionState == 1) {
            this.sceneTransition();
        } else {
            this.sceneTransitionBefore();
        }
    }
    getDestinationPositionFactors(point) {
        let x = 1;
        let z = 1;
        let absX = Math.abs(point.x);
        let absZ = Math.abs(point.z);
        let middle = Math.floor((absX + absZ) / 2);
        if (absX < absZ) {
            x = point.x / middle;
            z = point.z / middle;
        } else {
            x = point.x / middle;
            z = point.z / middle;
        }

        return {x, z};
    }
    sceneTransitionBefore() {
        this.clearActionPlane();

        let triggerWorldPosition = this.nearestTrigger.matrixWorld.getPosition();
        triggerWorldPosition.x *= -1;
        triggerWorldPosition.y = 0;
        triggerWorldPosition.z *= -1;

        this.entourageSlave.position.x = this.entourage.position.x;
        this.entourageSlave.position.y = this.entourage.position.y;
        this.entourageSlave.position.z = this.entourage.position.z;

        this.entourageSlave.rotation.x = this.entourage.rotation.x;
        this.entourageSlave.rotation.y = this.entourage.rotation.y;
        this.entourageSlave.rotation.z = this.entourage.rotation.z;

        this.entourageSlave.visible = true;
        this.entourageSlave.material.map = this.entourage.material.map;
        this.entourageSlave.material.opacity = 1;
        this.entourageSlave.material.needsUpdate = true;


        this.entourage.userData.moveTo = triggerWorldPosition;
        this.entourage.userData.transitionDistance = this.entourage.position.distanceTo(triggerWorldPosition);
        let newScale = (this.entourage.userData.transitionDistance + this.entourage.geometry.parameters.radius) / this.entourage.geometry.parameters.radius;
        this.entourage.scale.x = this.entourage.scale.y = this.entourage.scale.z = newScale;
        this.entourage.userData.transitionDistance = this.entourage.userData.transitionDistance * 2;
        this.entourage.userData.distnanceToTriggerOld = this.entourage.userData.transitionDistance;
        this.entourage.userData.factor = this.getDestinationPositionFactors(this.entourage.userData.moveTo);

        this.entourage.position.x = - triggerWorldPosition.x * 2;
        this.entourage.position.z = - triggerWorldPosition.z * 2;

        this.entourage.userData.startPosition = {
            x: this.entourage.position.x,
            y: this.entourage.position.y,
            z: this.entourage.position.z,
        };

        let scene = this.scenes[this.nearestTrigger.userData.destination];
        this.entourage.material.map = scene.texture;
        this.entourage.material.needsUpdate = true;

        this.entourage.userData.transitionState = 1;

        this.cursor.visible = false;

        this.onSceneTransitionStart();
    }
    sceneTransition() {
        if (!this.entourage.userData.moveTo || this.initialSceneOpen) return;

        let distnanceToTrigger = this.entourage.position.distanceTo({x: 0, y: 0, z: 0});

        if (this.entourage.userData.distnanceToTriggerOld && this.entourage.userData.distnanceToTriggerOld < distnanceToTrigger) {
            this.sceneTransitionAfter();
            return;
        }

        this.entourage.userData.distnanceToTriggerOld = distnanceToTrigger;

        let transitionProgress = 100 * (this.entourage.userData.transitionDistance - distnanceToTrigger) / this.entourage.userData.transitionDistance;
        let percentStart = 30;
        let percentStop = 60;
        if (transitionProgress >= percentStart) {
            this.entourageSlave.material.opacity = (- transitionProgress + percentStop) / (percentStop - percentStart);
        }

        this.entourage.position.x += this.entourage.userData.factor.x * 15;
        this.entourage.position.z += this.entourage.userData.factor.z * 15;

        this.entourageSlave.position.x += this.entourage.userData.factor.x * 15;
        this.entourageSlave.position.z += this.entourage.userData.factor.z * 15;
    }
    sceneTransitionAfter(sceneId) {
        this.entourage.userData.transitionState = 0;

        if (!sceneId) {
            sceneId = this.nearestTrigger.userData.destination;
        }
        this.currentScene = this.scenes[sceneId];

        this.entourageSlave.visible = false;

        this.entourage.scale.x = this.entourage.scale.y = this.entourage.scale.z = 1;
        this.entourage.position.x = this.entourage.position.y = this.entourage.position.z = 0;

        this.entourage.userData.moveTo = null;
        this.entourage.userData.factor = null;
        this.entourage.userData.distnanceToTriggerOld = null;

        this.entourage.material.map = this.currentScene.texture;
        this.entourage.material.map.anisotropy = this.maxAnisotropy;
        this.entourage.material.needsUpdate = true;

        this.cursor.visible = true;
        this.nearestTrigger = null;

        this.fillActionPlane(this.currentScene);

        this.onSceneTransitionEnd(sceneId);
    }

    animateCameraAngle() {
        let vector = this.camera.getWorldDirection(new THREE.Vector3(0, 0, 0));
        let theta = Math.atan2(- vector.x, vector.z) + Math.PI;

        this.frameCameraAngle(theta * 180 / Math.PI + this.entourage.userData.initialRotate);
    }

    animateRaycaster() {
        if (this.fpsControls.delta < this.fpsControls.interval) return;
        if (this.entourage.userData.transitionState != 0) return;

        this.raycaster.setFromCamera(this.pointer, this.camera);

        if (this.raycaster.ray.direction.y < this.cursor.userData.raycastDirectionDivide) {
            let intersects = this.raycaster.intersectObject(this.actionPlane);
            if (intersects.length) {
                let intersect = intersects[0];

                let x = intersect.point.x;
                let y = - intersect.point.z;
                let z = this.cursor.position.z;

                this.cursor.position.set(x, y, z);
            }
        } else {
            let theta = Math.atan2(this.raycaster.ray.direction.x, this.raycaster.ray.direction.z) + Math.PI;

            let vec = new THREE.Vector3(0, this.cursor.userData.maxDistance, 0);
            let axis = new THREE.Vector3(0, 0, 1);
            vec.applyAxisAngle(axis, theta);


            let x = vec.x;
            let y = vec.y;
            let z = this.cursor.position.z;

            this.cursor.position.set(x, y, z);
        }
    }

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

    ready() {}
    onSceneTransitionStart() {}
    onSceneTransitionEnd() {}
    frameCameraAngle() {}

    getTriggerCoordinatesByCursor() {
        let distanceK = this.cursor.position.distanceTo(this.camera.position) / (this.entourage.geometry.parameters.radius - this.transitionTriggerPrototype.geometry.parameters.radius);
        if (distanceK < 0.1) distanceK = 0.1;
        if (distanceK > 1) distanceK = 1;
        distanceK = parseFloat(distanceK.toFixed(2));

        ///////
        let cursorVector = new THREE.Vector3(this.cursor.position.x, this.cursor.position.y, 0);
        let axis = new THREE.Vector3(0, 0, 1);
        cursorVector.applyAxisAngle(axis, - this.entourage.userData.initialRotate / 180 * Math.PI);

        let theta = Math.atan2(cursorVector.x, cursorVector.y);
        let angle = theta * 180 / Math.PI;
        angle = parseFloat(angle.toFixed(0));

        return {angle, distanceK};
    }
}