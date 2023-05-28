class Project{
    icon
    desc
    name
    constructor(icon, desc, name){
        this.icon = icon;
        this.desc = desc;
        this.name = name;
    }
    getIcon(){
        return this.icon
    }
    getDesc(){
        return this.desc
    }
    getName(){
        return this.name
    }
    setIcon(icon){
        this.icon = icon
    }
    setDesc(desc){
        this.desc = desc;
    }
    setName(name){
        this.name = name;
    }
}
export default Project;