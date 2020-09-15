import Vue from 'vue'

import template from './index.html'

export default Vue.component('window-panorama', {
  template,
  props: ['imgSrc'],
  data () {
    return {
      isUserInteracting: false,
      onMouseDownMouseX: 0,
      onMouseDownMouseY: 0,
      lon: 0,
      onMouseDownLon: 0,
      lat: 0,
      onMouseDownLat: 0,
      phi: 0,
      theta: 0,
      camera: null,
      renderer: null,
      image: ''
    }
  },
  mounted () {
    this.image = this.imgSrc
    // var camera, renderer;

    // // var isUserInteracting = false,
    // // onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    // lon = 0, onMouseDownLon = 0,
    // lat = 0, onMouseDownLat = 0,
    // phi = 0, theta = 0;
    // var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat

    this.init();
    this.animate();
  },
  methods: {

    init() {
      const image = this.image

      var container, mesh;

      container = document.getElementById( 'panorama-container' );

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
      this.camera.target = new THREE.Vector3( 0, 0, 0 );

      window.scene = new THREE.Scene();

      var geometry = new THREE.SphereGeometry( 500, 60, 40 );
      geometry.scale( - 1, 1, 1 );

      var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( image )
      } );

      mesh = new THREE.Mesh( geometry, material );

      window.scene.add( mesh );

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( this.renderer.domElement );

      document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
      document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
      document.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false );

      //

      document.addEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

      }, false );

      document.addEventListener( 'dragenter', function ( event ) {

        document.body.style.opacity = 0.5;

      }, false );

      document.addEventListener( 'dragleave', function ( event ) {

        document.body.style.opacity = 1;

      }, false );

      document.addEventListener( 'drop', function ( event ) {

        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener( 'load', function ( event ) {

          material.map.image.src = event.target.result;
          material.map.needsUpdate = true;

        }, false );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

        document.body.style.opacity = 1;

      }, false );

      //

      window.addEventListener( 'resize', this.onWindowResize, false );

    },

    animate() {

      requestAnimationFrame( this.animate );
      this.update();

    },

    update() {

      this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
      this.phi = THREE.Math.degToRad( 90 - this.lat );
      this.theta = THREE.Math.degToRad( this.lon );

      this.camera.target.x = 500 * Math.sin( this.phi ) * Math.cos( this.theta );
      this.camera.target.y = 500 * Math.cos( this.phi );
      this.camera.target.z = 500 * Math.sin( this.phi ) * Math.sin( this.theta );

      this.camera.lookAt( this.camera.target );

      /*
      // distortion
      camera.position.copy( camera.target ).negate();
      */

      this.renderer.render( window.scene, this.camera );

    },

    onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( window.innerWidth, window.innerHeight );

    },

    onDocumentMouseDown( event ) {

      event.preventDefault();

      this.isUserInteracting = true;

      this.onPointerDownPointerX = event.clientX;
      this.onPointerDownPointerY = event.clientY;

      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;

    },

    onDocumentMouseMove( event ) {

      if ( this.isUserInteracting === true ) {

        this.lon = ( this.onPointerDownPointerX - event.clientX ) * 0.1 + this.onPointerDownLon;
        this.lat = ( event.clientY - this.onPointerDownPointerY ) * 0.1 + this.onPointerDownLat;

      }

    },

    onDocumentMouseUp( event ) {

      this.isUserInteracting = false;

    },

    onDocumentMouseWheel( event ) {

      this.camera.fov += event.deltaY * 0.05;
      this.camera.updateProjectionMatrix();

    }
  },
  beforeDestroy () {
    //  window.scene = null
    if (window.scene) {
      scene.remove(scene.children[0])
    }
    document.removeEventListener( 'mousedown', this.onDocumentMouseDown, false );
      document.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
      document.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
      document.removeEventListener( 'wheel', this.onDocumentMouseWheel, false );

      //

      document.removeEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

      }, false );

      document.removeEventListener( 'dragenter', function ( event ) {

        document.body.style.opacity = 0.5;

      }, false );

      document.removeEventListener( 'dragleave', function ( event ) {

        document.body.style.opacity = 1;

      }, false );

      document.removeEventListener( 'drop', function ( event ) {

        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener( 'load', function ( event ) {

          material.map.image.src = event.target.result;
          material.map.needsUpdate = true;

        }, false );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

        document.body.style.opacity = 1;

      }, false );

      //

      window.removeEventListener( 'resize', this.onWindowResize, false );
  }
})
