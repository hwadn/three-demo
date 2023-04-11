import * as THREE from 'three'

// 创建物体
const geometry = new THREE.BoxGeometry(4, 4, 4)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const cube = new THREE.Mesh(geometry, material)


// 动画
const animate = () => {
	cube.rotation.x += 0.01
	cube.rotation.y += 0.01
}

export {
	cube,
	animate
}
