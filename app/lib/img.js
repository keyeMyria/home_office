// @flow

type AvatarReturnType = {
    uri: string,
    width: number,
    height: number,
};

function validateUrl(url: ?string): ?string {
    if (!url) {
        return null;
    }
    const _url = String(url);
    return _url.startsWith('http') ? url : null;
}

export function avatar(url: ?string, width: number = 50, height: number = 50): AvatarReturnType {
    const uri = validateUrl(url) || 'https://www.gravatar.com/avatar/0?d=mm&f=y';
    return { uri, width, height };
}

export default {
    avatar,
};
