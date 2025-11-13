export const parseXYZ = (xyzString) => {
  const colorMap = {
    'Cu': 0xB87333,
    'Ni': 0x8C92AC,
    'C': 0x909090,
    'N': 0x3050F8,
    'O': 0xFF0D0D,
    'H': 0xFFFFFF,
    'Cl': 0x1FF01F
  };
  const radiusMap = {
    'Cu': 0.7,
    'Ni': 0.7,
    'C': 0.4,
    'N': 0.4,
    'O': 0.4,
    'H': 0.25,
    'Cl': 0.5
  };
  const atoms = [];
  if (!xyzString) return atoms;
  const lines = xyzString.split('\n');
  for (let i = 2; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length >= 4) {
      const element = parts[0];
      atoms.push({
        element,
        x: parseFloat(parts[1]),
        y: parseFloat(parts[2]),
        z: parseFloat(parts[3]),
        color: colorMap[element] || 0x808080,
        radius: radiusMap[element] || 0.3
      });
    }
  }
  if (atoms.length > 0) {
    let centerX = 0, centerY = 0, centerZ = 0;
    atoms.forEach(atom => {
      centerX += atom.x;
      centerY += atom.y;
      centerZ += atom.z;
    });
    centerX /= atoms.length;
    centerY /= atoms.length;
    centerZ /= atoms.length;
    atoms.forEach(atom => {
      atom.x -= centerX;
      atom.y -= centerY;
      atom.z -= centerZ;
    });
  }
  return atoms;
};

export const calculateBonds = (atoms) => {
  const bonds = [];
  const bondDistances = {
    'C-C': 1.7, 'C-N': 1.6, 'C-O': 1.6, 'C-H': 1.2, 'C-Cl': 1.9,
    'N-N': 1.6, 'N-O': 1.6, 'N-H': 1.2, 'N-Cl': 1.8,
    'O-O': 1.6, 'O-H': 1.2, 'O-Cl': 1.8,
    'H-H': 1.0, 'H-Cl': 1.4,
    'Cl-Cl': 2.2,
    'Cu-Cu': 2.8, 'Cu-C': 2.2, 'Cu-N': 2.2, 'Cu-O': 2.2, 'Cu-Cl': 2.3,
    'Ni-Ni': 2.8, 'Ni-C': 2.2, 'Ni-N': 2.2, 'Ni-O': 2.2, 'Ni-Cl': 2.3,
  };

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const atom1 = atoms[i];
      const atom2 = atoms[j];

      const dx = atom2.x - atom1.x;
      const dy = atom2.y - atom1.y;
      const dz = atom2.z - atom1.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const elements = [atom1.element, atom2.element].sort();
      const bondKey = `${elements[0]}-${elements[1]}`;
      const maxBondDistance = bondDistances[bondKey] || 1.8;

      if (distance < maxBondDistance) {
        bonds.push({
          start: { x: atom1.x, y: atom1.y, z: atom1.z },
          end: { x: atom2.x, y: atom2.y, z: atom2.z },
          distance
        });
      }
    }
  }

  return bonds;
};
