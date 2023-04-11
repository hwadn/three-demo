import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
const cube = new THREE.Mesh( geometry, material )

// 场景加入物体
scene.add( cube )

// 场景相机
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 )
document.body.appendChild( renderer.domElement )

// 动画
function animate() {
	requestAnimationFrame( animate )
	cube.rotation.x += 0.1
	cube.rotation.y += 0.1

	renderer.render( scene, camera )
}

animate();
