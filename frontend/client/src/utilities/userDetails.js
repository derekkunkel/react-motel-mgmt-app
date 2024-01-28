class UserDetails {
    /**
     * Only use this class when trying to get
     * user details during a hook or grabbing
     * user specific role/permission, otherwise
     * you can call useAuth0 to grab user
     * details
     * @param {Access Token} token 
     */
    constructor(token){
        this.token = token;
        this.email = null;
        this.family_name = null;
        this.given_name = null;
        this.name = null;
        this.id = null;
        this.role = null;
        this.allDetails = null;
    }

    async initialize() {
        const response = await fetch(`https://dev-isqr3dj4.us.auth0.com/userinfo`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).then(response => response.json());

        this.email = response.email;
        this.family_name = response.family_name;
        this.given_name = response.given_name;
        this.name = response.name;
        this.id = response.sub;
        this.role = response["https://dev-isqr3dj4:us:auth0:com/userRole"];
        this.allDetails = response;

    }

}


export default UserDetails;