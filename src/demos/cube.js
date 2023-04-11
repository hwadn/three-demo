import * as THREE from 'three'

// 创建物体
const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const cube = new THREE.Mesh(geometry, material)


// 动画
const animate = (speed) => {
	cube.rotation.x = 60 * speed
	cube.position.y += 100 * speed

	if (cube.position.y >= 600) {
		cube.position.y = 0
	}
}

export {
	cube,
	animate
}
