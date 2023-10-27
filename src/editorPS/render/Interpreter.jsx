const text = (element, index) => {
    element = element.replace("&text-ps", "");

    let array = element.split("&end-text");
    array.pop();

    let string = "";

    array.map((el) => {
        string += el;
    })

    return (
        <div className="text-el" key={index} dangerouslySetInnerHTML={{ __html: string }}>
        </div>
    );
}
const getString = (string) => {
    let helper = "";
    let x = 0;

    while (string.charAt(x) !== " ") {
        helper += string.charAt(x);
        x++;
    }

    return helper;
}

const getDataFromStringSlide = (slide, i) => {
    let slideHelper = slide;
    let type;
    let publicId;
    let from;
    let url;
    let sourceReader;

    if (slide.includes("type:image")) {
        type = "image";
        slideHelper = slideHelper.split("type:image  ")[1];
    } else if (slide.includes("type:video")) {
        type = "video";
        slideHelper = slideHelper.split("type:video  ")[1];
    }

    if (slide.includes("sourceReader:none")) {

        sourceReader = "none";
        slideHelper = slideHelper.split("sourceReader:none  ")[1];

    } else {
        slideHelper = slideHelper.split("sourceReader:")[1];

        const string = getString(slideHelper);
        sourceReader = string;

        slideHelper = slideHelper.split(string + " ")[1];
    }

    if (slideHelper.includes("publicId:none")) {
        publicId = "none";
        slideHelper = slideHelper.split("publicId:none ")[1];
    } else {
        slideHelper = slideHelper.split("publicId:")[1];

        const string = getString(slideHelper);
        publicId = string;
        slideHelper = slideHelper.split(string + " ")[1];
    }

    if (slideHelper.includes("url:")) {
        from = "url";
        slideHelper = slideHelper.split("url:")[1];
        url = slideHelper;
    } else {
        from = "computer";
        slideHelper = slideHelper.split("computer:")[1];
        url = slideHelper;
    }

    return {
        id: i,
        from,
        url,
        sourceType: type,
        sourceReader,
        publicId
    }
}

const slider = (element, index) => {
    element = element.replace("&sliders-ps", "");
    let array = element.split("&end-slide");
    array.pop();


    let returnObj;

    let obj = array.map((slide, i) => {
        return getDataFromStringSlide(slide, i);
    })

    returnObj = {
        id: index,
        type: "source",
        actualIndex: 0,
        source: obj
    }


    return returnObj;

}

const checkIsYt = (el) => {
    let isYt = false;
    let urlYt;

    if (el.source[el.actualIndex].url.includes("youtube")) {
        isYt = true;
        urlYt = el.source[el.actualIndex].url;
        urlYt = urlYt.replace("watch?v=", "embed/");
    }

    if (isYt) return { isYt, urlYt };

    return { isYt, urlYt: null };
}


const sliderCreator = (el, index) => {

    if (el.source[el.actualIndex].sourceType === "image") {
        return (
            <div key={index} className="slider-container-ps">
                <div className="iframe-container">
                    <div className="img-container" style={{
                        backgroundImage: `url("${el.source[el.actualIndex].url}")`
                    }}></div>
                </div>
            </div >
        )

    } else {

        const obj = checkIsYt(el);
        if (obj.isYt) {
            return (
                <div key={index} className="slider-container-ps">

                    <div className="iframe-container">
                        <iframe title="Youtube video player" src={obj.urlYt} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                    </div>
                </div >
            );
        } else {
            return (
                <div key={index} className="slider-container-ps">
                    <div className="iframe-container" style={{ paddingTop: 0 }}>
                        <video controls frameBorder="0">
                            <source src={el.source[el.actualIndex].url} type="video/mp4" />
                            <source src={el.source[el.actualIndex].url} type="video/ogg" />
                        </video>
                    </div>

                </div>
            )
        }

    }

}




const checkTextAlign = (el) => {
    if (el.includes("justify")) {
        return "justify";
    } else if (el.includes("center")) {
        return "center";
    } else if (el.includes("left")) {
        return "left";
    } else if (el.includes("right")) {
        return "right";
    } else return "none"
}

const createData = (el) => {

    let x = 0;

    while (el.charAt(x) !== '>') {
        x++;
    }


    el = el.slice(x + 1, el.length);

    x = el.length - 1;
    while (el.charAt(x) !== '<') {
        x--;
    }

    el = el.slice(0, x);

    return el;
}

const getLevel = (el) => {
    let x = 0;

    while (el.charAt(x) !== '<') {
        x++;
    }


    return el.charAt(x + 2);
}

const dfs = (ul) => {
    return Array.from(ul.children, ({ children: [{ textContent: content }, lu] }) =>
        lu ? { items: dfs(lu), content } : { content, items: [] }
    );
}

const list = (element, elementType, index) => {
    const { body } = new DOMParser().parseFromString(element, "text/html");

    const result = dfs(body.children[0]);
    return result;
}

const textEditor = (element, index) => {
    element = element.replace("&text-ps", "");

    let array = element.split("&end-text");
    array.pop();

    let obj = [];
    array.forEach(el => {
        if (el.includes("<ul")) {
            const arr = list(el, "ul", index);

            obj.push({
                type: "list",
                data: {
                    style: "unordered",
                    items: arr
                }
            })
        }
        else if (el.includes("<ol")) {
            const arr = list(el, "ol", index);


            obj.push({
                type: "list",
                data: {
                    style: "ordered",
                    items: arr
                }
            })
        }
        else if (el.includes("<p") && !el.includes("<ul") && !el.includes("<ol") && (!el.includes("delimiter-ps"))) {
            let type = "paragraph";
            let alignment = checkTextAlign(el);
            let data = createData(el);

            obj.push({
                type: type,
                data: {
                    text: data,
                    alignment: alignment
                },

            })


        } else if (el.includes("<h")) {
            let levelHelper = getLevel(el);
            let type = "header";
            let data = createData(el);
            let alignment = checkTextAlign(el);

            let level = Number(levelHelper);

            obj.push({
                type: type,
                data: {
                    text: data,
                    level: level,
                    alignment: alignment
                }
            })
        } else if (el.includes("delimiter-ps")) {
            obj.push({
                type: "delimiter",
                data: {}
            })
        } else if (el.includes("<table")) {
            console.log(el);
        }
    })

    return obj;
}

export const startInterpreter = (string) => {

    let array = string.split("&end-element-ps");

    array.pop();

    const elements = array.map((element, index) => {
        if (element.includes("&sliders-ps")) {
            const el = slider(element, index);
            const block = sliderCreator(el, index);
            return block;

        } else {
            const el = text(element, index)
            return el;
        }
    })



    return elements;

}

export const startInterpreterEditor = (string) => {

    let array = string.split("&end-element-ps");
    array.pop();

    console.log('array pop', array);

    const elements = array.map((element, index) => {
        let el;
        if (element.includes("&sliders-ps")) {
            el = slider(element, index);
            return { type: "source", data: el }
        }
        else if (element.includes("&text-ps")) {
            el = textEditor(element, index)
            return { type: "text", data: el }
        }
    })

    return elements;
}