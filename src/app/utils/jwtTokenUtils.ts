import { jwtDecode, JwtPayload } from 'jwt-decode';

interface JWTToken extends JwtPayload {
    systemId?: string | number;
    tenantId?: string | number;
}
export function decodeToken(token: string): JWTToken | null {
    try {
        return jwtDecode<JWTToken>(token);
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const decodedToken =  decodeToken(token);
    const expirationTime = decodedToken?.exp ?  decodedToken.exp * 1000 : 0;

    return Date.now() >= expirationTime;
}
