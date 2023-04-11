import * as THREE from 'three'

// 创建物体
const material = new THREE.LineBasicMaterial({
	color: 0xffffff,
})

const points = []
points.push(new THREE.Vector3(350, 0, 0))
points.push(new THREE.Vector3(0, 350, 0))
points.push(new THREE.Vector3(0, 0, 350))
points.push(new THREE.Vector3(350, 0, 0))
const gemetry = new THREE.BufferGeometry().setFromPoints(points)

const line = new THREE.Line(gemetry, material)

export {
	line,
}