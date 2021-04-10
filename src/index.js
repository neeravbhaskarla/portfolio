import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 1, 32, 32);

// Materials

const material = new THREE.MeshStandardMaterial()
material.wireframe=true
material.metalness = 0.3
// Mesh
const sphere = new THREE.Mesh(geometry,material)
if(sizes.width>550){
    sphere.position.x = 1.7
}
else{
    sphere.position.x = 0.3
}
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 2
scene.add(pointLight)

/**
 * Sizes
 */
window.addEventListener('resize', () =>
{
    // Update 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
// camera.lookAt(sphere.position)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()