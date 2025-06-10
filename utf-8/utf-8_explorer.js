function convertCharacter() {
  const input = document.getElementById("charInput").value;
  const outputDiv = document.getElementById("output");
  const resultsSection = document.getElementById("results");

  if (!input) {
    outputDiv.innerHTML = `<p class="text-red-600 font-bold">Please enter a character.</p>`;
    resultsSection.classList.remove("hidden");
    return;
  }

  const char = input.slice(0, 1);
  const codePoint = char.codePointAt(0);

  let resultHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-stone-100 p-4 rounded-lg">
                        <p class="font-bold text-stone-700">Input Character:</p>
                        <p class="text-3xl font-bold text-teal-600">${char}</p>
                    </div>
                     <div class="bg-stone-100 p-4 rounded-lg">
                        <p class="font-bold text-stone-700">Unicode Code Point:</p>
                        <p class="text-3xl font-bold text-teal-600">U+${codePoint
                          .toString(16)
                          .toUpperCase()
                          .padStart(4, "0")}</p>
                    </div>
                </div>`;

  let binaryCodePoint = codePoint.toString(2);
  let hexBytes = "";
  let binaryBytes = "";
  let explanation = "";

  if (codePoint >= 0 && codePoint <= 0x7f) {
    // 1-byte sequence
    binaryCodePoint = binaryCodePoint.padStart(7, "0");
    const byte1 = "0" + binaryCodePoint;
    hexBytes = parseInt(byte1, 2).toString(16).toUpperCase().padStart(2, "0");
    binaryBytes = `<span class="bit-group"><span class="pattern-bit">0</span><span class="data-bit">${binaryCodePoint}</span></span>`;
    explanation = `
                    <p><strong class="text-stone-700">Rule Applied:</strong> 1-Byte Sequence (ASCII)</p>
                    <p>The code point fits within 7 bits, so it's encoded directly into a single byte starting with '0'.</p>
                `;
  } else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
    // 2-byte sequence
    binaryCodePoint = binaryCodePoint.padStart(11, "0");
    const bits1 = binaryCodePoint.slice(0, 5);
    const bits2 = binaryCodePoint.slice(5);
    const byte1 = "110" + bits1;
    const byte2 = "10" + bits2;
    hexBytes = `${parseInt(byte1, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte2, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")}`;
    binaryBytes = `
                    <span class="bit-group"><span class="pattern-bit">110</span><span class="data-bit">${bits1}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits2}</span></span>`;
    explanation = `
                    <p><strong class="text-stone-700">Rule Applied:</strong> 2-Byte Sequence</p>
                    <p>The 11 bits of the code point (<code class="bg-stone-200 p-1 rounded">${binaryCodePoint}</code>) are split into a 5-bit group and a 6-bit group.</p>
                `;
  } else if (codePoint >= 0x800 && codePoint <= 0xffff) {
    // 3-byte sequence
    binaryCodePoint = binaryCodePoint.padStart(16, "0");
    const bits1 = binaryCodePoint.slice(0, 4);
    const bits2 = binaryCodePoint.slice(4, 10);
    const bits3 = binaryCodePoint.slice(10);
    const byte1 = "1110" + bits1;
    const byte2 = "10" + bits2;
    const byte3 = "10" + bits3;
    hexBytes = `${parseInt(byte1, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte2, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte3, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")}`;
    binaryBytes = `
                    <span class="bit-group"><span class="pattern-bit">1110</span><span class="data-bit">${bits1}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits2}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits3}</span></span>`;
    explanation = `
                    <p><strong class="text-stone-700">Rule Applied:</strong> 3-Byte Sequence</p>
                    <p>The 16 bits of the code point (<code class="bg-stone-200 p-1 rounded">${binaryCodePoint}</code>) are split into one 4-bit and two 6-bit groups.</p>
                `;
  } else if (codePoint >= 0x10000 && codePoint <= 0x10ffff) {
    // 4-byte sequence
    binaryCodePoint = binaryCodePoint.padStart(21, "0");
    const bits1 = binaryCodePoint.slice(0, 3);
    const bits2 = binaryCodePoint.slice(3, 9);
    const bits3 = binaryCodePoint.slice(9, 15);
    const bits4 = binaryCodePoint.slice(15);
    const byte1 = "11110" + bits1;
    const byte2 = "10" + bits2;
    const byte3 = "10" + bits3;
    const byte4 = "10" + bits4;
    hexBytes = `${parseInt(byte1, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte2, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte3, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")} ${parseInt(byte4, 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")}`;
    binaryBytes = `
                    <span class="bit-group"><span class="pattern-bit">11110</span><span class="data-bit">${bits1}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits2}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits3}</span></span>
                    <span class="bit-group"><span class="pattern-bit">10</span><span class="data-bit">${bits4}</span></span>`;
    explanation = `
                    <p><strong class="text-stone-700">Rule Applied:</strong> 4-Byte Sequence</p>
                    <p>The 21 bits of the code point (<code class="bg-stone-200 p-1 rounded">${binaryCodePoint}</code>) are split into one 3-bit and three 6-bit groups.</p>
                `;
  }

  resultHTML += `
                <div class="bg-stone-100 p-4 rounded-lg">
                    <p class="font-bold text-stone-700 mb-2">Code Point (Binary):</p>
                    <p class="text-lg font-mono break-all text-teal-600">${binaryCodePoint}</p>
                </div>
                <div class="bg-stone-100 p-4 rounded-lg text-stone-600">${explanation}</div>
                <div class="bg-teal-800 text-white p-4 rounded-lg col-span-1 md:col-span-2">
                    <p class="font-bold mb-2">Final UTF-8 Bytes (Binary):</p>
                    <p class="text-lg break-all">${binaryBytes}</p>
                    <hr class="my-3 border-teal-600">
                    <p class="font-bold mb-2">Final UTF-8 Bytes (Hex):</p>
                    <p class="text-2xl font-mono">${hexBytes}</p>
                </div>
            `;

  outputDiv.innerHTML = resultHTML;
  resultsSection.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-toggle");
  accordions.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector("span:last-child");
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
