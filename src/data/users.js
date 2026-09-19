export const demoUsers = [
  { id: 1, name: 'Asesor(a) del proyecto', email: 'asesor@psicoconecta.mx', password: 'Asesor2026!', role: 'Administrador', status: 'Activo' },
  { id: 2, name: 'Francisco Ochoa', email: 'francisco@psicoconecta.mx', password: 'Equipo2026!', role: 'Administrador', status: 'Activo' },
]

export function publicUser(user) {
  const { password: _password, ...safeUser } = user
  return safeUser
}
