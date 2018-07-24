
const Role = { aplicacao: 'APLICACAO', parceiro: 'PARCEIRO', cliente: 'CLIENTE', admistrador: 'ADMINISTRADOR', autenticado: 'AUTENTICADO' }
const Roles = [Role.aplicacao, Role.cliente, Role.parceiro, Role.admistrador];
const validateRole = (sholdHave, role) => {

    let have = sholdHave.filter((item) => {
        if (role === item) { return true }
    })

    return have == role
}

module.exports = RoleTypes = {
    role: Role,
    roles: Roles,
    validateRole: validateRole
}

