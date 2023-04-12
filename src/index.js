import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { axesHelper } from './helpers/axesHelper'
import { cube, animate as cubeAnimate } from './demos/cube'
import { line } from './demos/lines'
import { createText } from './demos/text'

// 创建场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(0, 0, 600)
camera.lookAt(0, 0, 0)

// 添加坐标轴
scene.add(axesHelper)
// // 添加物体
scene.add(cube)
scene.add(line)

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update();

// 动画
let prevTime
const animate = (time) => {
	requestAnimationFrame(animate)
	if (!prevTime) {
		prevTime = time
		return
	}
	const diff = time - prevTime
	prevTime = time
	// 位移多少/秒
	const speed = diff / 1000
	cubeAnimate(speed)
	controls.update();
	renderer.render(scene, camera)
}

animate()

// 自适应屏幕
window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})
// 双击全屏
window.addEventListener('dblclick', () => {
	const fullScreenElement = document.fullscreenElement
	if (fullScreenElement) {
		document.exitFullscreen()
	} else {
		renderer.domElement.requestFullscreen()
	}
})

// 灯光
const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

// 添加文本
const fontLoader = new FontLoader()
fontLoader.load(
	'node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json',
	// called when the font has loaded
	(font) => {
		const textMesh = createText('chd three.js', font)
		textMesh.position.set(50, 300, 0)
		scene.add(textMesh)
	}
)

// 加载3d模型
const loader = new GLTFLoader()
loader.load(
	'public/sea_keep_lonely_watcher/scene.gltf',
	gltf => {
		scene.add(gltf.scene)
	},
	// processing
	xhr => {
		console.log((xhr.loaded / xhr.total) * 100, '% loaded')
	},
	// error
	error => {
		console.log('error:', error)
	}
)
