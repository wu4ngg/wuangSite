class User{
    fullname
    github
    nickname
    constructor(full,git,nick){
        this.fullname = full
        this.github = git
        this.nickname = nick
    }
    getFullName(){
        return this.fullname
    }
    setFullName(n){
        this.fullname = n
    }
    getGithub(){
        return this.github
    }
    setGithub(n){
        this.github = n
    }
    getNickName(){
        return this.nickname
    }
    setNickName(n){
        this.nickname = n
    }
}
export default User