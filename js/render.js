
/*
    {
        type: 'h1',
        props: {
            className: "",
            style: "",
        },
        children: [] // 嵌套节点
    }

    按照这样的一棵树，渲染出一个DOM树来
*/

function render(vdom) {
    if (vdom == null) {
        return null;
    }
    
    const _render = vdom => {
        const node = vdom;
        let ele;

        if (node.type === 'text') {
            ele = document.createTextNode(node.children.toString());
        } else {
            ele = document.createElement(node.type);
        }

        for (let prop in node.props) {
            if (node.props.hasOwnProperty(prop)) {
                ele[prop] = node.props[prop];
            }
        }

        if (node.children.length > 0 && node.type !== 'text') {
            node.children.map(_render).forEach(child => {
                ele.appendChild(child);
            });
        }

        return ele;
    }

    return _render(vdom);
}

function renderToDOM(vdom, container = document.body) {
    const realDOM = render(vdom);

    if (realDOM === null) {
        return;
    }

    if (!container) {
        return;
    }

    container.appendChild(realDOM);
}

var vdom = {
    type: 'div',
    props: {
        className: 'root-container',
    },
    children: [
        {
            type: 'h1',
            props: {
                className: 'title'
            },
            children: [
                {
                    type: 'text',
                    children: ['hello world']
                }
            ]
        },
        {
            type: 'p',
            children: [
                {
                    type: 'text',
                    children: ['javascript']
                }
            ]
        }
    ]
}

renderToDOM(vdom, document.getElementById('root'));