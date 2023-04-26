import * as THREE from 'three'

// 创建物体
const generateCube = (size) => {
	const geometry = new THREE.BoxGeometry(size, size, size)
	const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
	const cube = new THREE.Mesh(geometry, material)

	const animate = (speed, top) => {
		const segment = top / 5
		cube.rotation.x = segment * speed
		cube.rotation.x = segment * speed
		cube.position.y += segment * speed
	
		if (cube.position.y >= top) {
			cube.position.y = 0
		}
	}

	return { cube, animate }
}

export {
	generateCube
}
