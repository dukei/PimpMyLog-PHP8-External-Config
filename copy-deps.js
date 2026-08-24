const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');
const SRC_DIR = path.join(__dirname, 'node_modules');
const DEST_DIR = path.join(__dirname, 'bower_components');

console.log('==================================================');
console.log(' 🚀 Запуск динамического копирования компонентов ');
console.log('==================================================\n');

// 1. Проверяем наличие package.json
if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error(' [КРИТИЧЕСКАЯ ОШИБКА] Файл package.json не найден в корне проекта!');
    process.exit(1);
}

// 2. Читаем и парсим package.json
let components = [];
try {
    const packageData = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    if (packageData.napa && typeof packageData.napa === 'object') {
        components = Object.keys(packageData.napa);
    }
} catch (err) {
    console.error(` [КРИТИЧЕСКАЯ ОШИБКА] Не удалось прочитать package.json: ${err.message}`);
    process.exit(1);
}

// 3. Проверяем, есть ли что копировать
if (components.length === 0) {
    console.warn(' [ПРЕДУПРЕЖДЕНИЕ] Блок "napa" в package.json пуст или отсутствует.');
    process.exit(0);
}

// 4. Проверяем и создаем целевую папку bower_components
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log(`[+] Создана директория: ${DEST_DIR}\n`);
}

let successCount = 0;
let errorCount = 0;

// 5. Рекурсивно копируем каждый компонент
components.forEach(component => {
    const srcPath = path.join(SRC_DIR, component);
    const destPath = path.join(DEST_DIR, component);

    if (fs.existsSync(srcPath)) {
        try {
            // Очищаем старую папку перед копированием, если она существовала
            if (fs.existsSync(destPath)) {
                fs.rmSync(destPath, { recursive: true, force: true });
            }

            // Копируем содержимое директории
            fs.cpSync(srcPath, destPath, { recursive: true, force: true });
            console.log(` [УСПЕХ] ${component} -> скопирован.`);
            successCount++;
        } catch (err) {
            console.error(` [ОШИБКА] Не удалось скопировать ${component}: ${err.message}`);
            errorCount++;
        }
    } else {
        console.error(` [ПРОПУЩЕНО] Компонент "${component}" не найден в node_modules. Запустите сначала "npm run install-deps".`);
        errorCount++;
    }
});

// 6. Выводим финальный отчет
console.log('\n==================================================');
console.log(' 📊 Финальный отчет:');
console.log(`   Найдено в package.json (napa): ${components.length}`);
console.log(`   Успешно скопировано:           ${successCount}`);
console.log(`   Ошибок / пропущено:            ${errorCount}`);
console.log('==================================================');