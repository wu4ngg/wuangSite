class Project{
    icon
    desc
    name
    id
    constructor(icon, desc, name, id){
        this.id = id;
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
    getId(){
        return this.id;
    }
}
export default Project;