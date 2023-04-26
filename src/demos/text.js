import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export const createText = (text, font, size) => {
	const geometry = new TextGeometry(text, {
		font,
		size,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.01,
		bevelOffset: 0,
		bevelSegments: 2,
	})

	const material = new THREE.MeshBasicMaterial({ color: 'aqua' })
	const mesh = new THREE.Mesh(geometry, material)

	return mesh
}
