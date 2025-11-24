const contactBtn = document.getElementById("contactbutton");
const contactForm = document.getElementById("contactform");
const form = contactForm.querySelector("form");

contactBtn.addEventListener("click", () => {

    if (contactForm.style.display === "" || contactForm.style.display === "none") {
        contactForm.style.display = "flex";

        setTimeout(() => {
            contactForm.scrollIntoView({ behavior: "smooth" });
        }, 50);

    } else {
        contactForm.style.display = "none";
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Your message has been sent!");

    form.reset();

    contactForm.style.display = "none";
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // блокуємо відправку форми

        const text = searchInput.value.trim();
        if (text === "") return;

        removeHighlights();       // знімаємо старі виділення
        highlightText(text);      // шукаємо й виділяємо
        scrollToFirstResult();    // переходимо до першого знайденого
    }
});

function highlightText(word) {
    const body = document.body;
    const regex = new RegExp(word, "gi");

    walkTextNodes(body, function (node) {
        const matches = node.nodeValue.match(regex);
        if (matches) {
            const span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(regex, match =>
                `<mark class="highlighted">${match}</mark>`
            );
            node.replaceWith(span);
        }
    });
}

function walkTextNodes(node, callback) {
    if (node.nodeType === 3) {
        callback(node);
    } else {
        node.childNodes.forEach(child => walkTextNodes(child, callback));
    }
}

function removeHighlights() {
    const marks = document.querySelectorAll("mark.highlighted");
    marks.forEach(mark => {
        const textNode = document.createTextNode(mark.innerText);
        mark.replaceWith(textNode);
    });
}

function scrollToFirstResult() {
    const firstMark = document.querySelector("mark.highlighted");
    if (firstMark) {
        firstMark.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}