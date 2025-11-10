function requireRole(allowedRoles) {
    if (typeof allowedRoles === 'string') {
        allowedRoles = [allowedRoles];
    }

    return function(req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Требуется аутентификация'
            });
        }

        const userRole = req.user.role;
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Недостаточно прав для выполнения операции',
                error: {
                    requiredRoles: allowedRoles,
                    userRole: userRole
                }
            });
        }

        next();
    };
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Требуется аутентификация'
        });
    }
    next();
}

const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator'
};

const roleHierarchy = {
    [ROLES.ADMIN]: 3,
    [ROLES.MODERATOR]: 2,
    [ROLES.USER]: 1
};

function requireMinRole(minRole) {
    return function(req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Требуется аутентификация'
            });
        }

        const userRoleLevel = roleHierarchy[req.user.role] || 0;
        const minRoleLevel = roleHierarchy[minRole] || 0;

        if (userRoleLevel < minRoleLevel) {
            return res.status(403).json({
                success: false,
                message: `Требуется роль ${minRole} или выше`
            });
        }

        next();
    };
}

module.exports = {
    requireRole,
    requireAuth,
    requireMinRole,
    ROLES
};