import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { axesHelper } from './helpers/axesHelper'
import { generateCube } from './demos/cube'
import { generateLine } from './demos/lines'
import { createText } from './demos/text'

import * as dat from 'dat.gui'

const size = 8

// 创建场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(0, 0, size)
camera.lookAt(0, 0, 0)

// 自创建几何体
const width = 20
const length = 30
const depth = -4
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
	width, depth, -length,
	-width, depth, -length,
	-width, depth, length,
	-width, depth, length,
	width, depth, length,
	width, depth, -length,
])
const doorTexture = new THREE.TextureLoader().load('public/floor.jpeg')
const material = new THREE.MeshBasicMaterial({ map: doorTexture })
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 添加坐标轴
scene.add(axesHelper(size))
// // 添加物体
const { cube, animate: cubeAnimate } = generateCube(2)
scene.add(cube)
const line = generateLine(size)
scene.add(line)

// 调试
const gui = new dat.GUI()

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
	cubeAnimate(speed, size * 3)
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
const light = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.set(size, size, size)
pointLight.color.setHSL(255, 255, 255)
scene.add(pointLight)

// 添加文本
const fontLoader = new FontLoader()
fontLoader.load(
	'node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json',
	// called when the font has loaded
	(font) => {
		const textMesh = createText('my three.js demo', font, 0.5)
		textMesh.position.set(size / 2, size, 0)
		scene.add(textMesh)
		gui.add(textMesh.position, 'x').min(-size).max(size).name('文本x')
		gui.add(textMesh.position, 'y').min(-size).max(size).name('文本y')
		gui.add(textMesh.position, 'z').min(-size).max(size).name('文本z')
	}
)

// 加载3d模型
const loader = new GLTFLoader()
loader.load(
	'public/chevrolet_cruze/scene.gltf',
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
