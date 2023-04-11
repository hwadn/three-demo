import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

import { axesHelper } from './helpers/axesHelper'
import { cube, animate as cubeAnimate } from './demos/cube'
import { line } from './demos/lines'
import { createText } from './demos/text'

// 创建场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(20, 30, 50)
camera.lookAt(0, 0, 0)

// 添加坐标轴
scene.add(axesHelper)
// 添加物体
scene.add(cube)
scene.add(line)

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const animate = () => {
	requestAnimationFrame(animate)
	cubeAnimate()

	renderer.render(scene, camera)
}

animate()

// 添加文本
const fontLoader = new FontLoader()
fontLoader.load(
	'node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json',
	// called when the font has loaded
	(font) => {
		const textMesh = createText('three.js demos', font)
		textMesh.position.set(5, 30, 0)
		scene.add(textMesh)
	}
)
