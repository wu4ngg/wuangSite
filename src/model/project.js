class Project{
    icon
    desc
    name
    id
    lang_front = []
    lang_back = []
    constructor(icon, desc, name, id, front, back){
        this.id = id;
        this.icon = icon;
        this.desc = desc;
        this.name = name;
        this.lang_front = front
        this.lang_back = back
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