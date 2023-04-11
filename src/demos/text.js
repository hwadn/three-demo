import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export const createText = (text, font) => {
	const geometry = new TextGeometry(text, {
		font,
		size: 2,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5,
	})

	const material = new THREE.MeshBasicMaterial({ color: 'aqua' })
	const mesh = new THREE.Mesh(geometry, material)

	return mesh
}
