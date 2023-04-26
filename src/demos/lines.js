import * as THREE from 'three'

// 创建物体
const material = new THREE.LineBasicMaterial({
	color: 0xffffff,
})

const generateLine = size => {
	const points = []
	const length = size / 2
	points.push(new THREE.Vector3(length, 0, 0))
	points.push(new THREE.Vector3(0, length, 0))
	points.push(new THREE.Vector3(0, 0, length))
	points.push(new THREE.Vector3(length, 0, 0))
	const gemetry = new THREE.BufferGeometry().setFromPoints(points)

	return new THREE.Line(gemetry, material)
}

export {
	generateLine,
}