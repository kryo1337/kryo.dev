import { InstancedMesh, Material } from 'three';

export function disposeMeshes(meshes: InstancedMesh[]) {
  const materials = new Set<Material>();
  for (const mesh of meshes) {
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => materials.add(material));
    } else {
      materials.add(mesh.material);
    }
    mesh.dispose();
  }
  materials.forEach((material) => material.dispose());
}
