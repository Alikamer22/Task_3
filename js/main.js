// ==========================================
// 1. تعريف كلاس Student مع حماية البيانات (Encapsulation)
// ==========================================
class Student {
    // الحقول المخفية (Private Fields) لحماية البيانات من التلاعب المباشر
    #name;
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {
        this.name = name; // الاسم عادي
        // استخدام حراس الأمان (Setters) للتحقق الفوري من صحة القيم المدخلة
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    // --- حارس الأمان للمادة الأولى ---
    set grade1(value) {
        if (value === "" || value === null || isNaN(value)) {
            throw new Error("يجب إدخال درجة المادة الأولى ولا يمكن ترك الحقل فارغاً.");
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            throw new Error("خطأ في درجة المادة الأولى: يجب أن تكون الدرجة محصورة بين 0 و 100.");
        }
        this.#grade1 = num;
    }
    get grade1() { return this.#grade1; }

    // --- حارس الأمان للمادة الثانية ---
    set grade2(value) {
        if (value === "" || value === null || isNaN(value)) {
            throw new Error("يجب إدخال درجة المادة الثانية ولا يمكن ترك الحقل فارغاً.");
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            throw new Error("خطأ في درجة المادة الثانية: يجب أن تكون الدرجة محصورة بين 0 و 100.");
        }
        this.#grade2 = num;
    }
    get grade2() { return this.#grade2; }

    // --- حارس الأمان للمادة الثالثة ---
    set grade3(value) {
        if (value === "" || value === null || isNaN(value)) {
            throw new Error("يجب إدخال درجة المادة الثالثة ولا يمكن ترك الحقل فارغاً.");
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            throw new Error("خطأ في درجة المادة الثالثة: يجب أن تكون الدرجة محصورة بين 0 و 100.");
        }
        this.#grade3 = num;
    }
    get grade3() { return this.#grade3; }

    // --- حارس الأمان نسبة الحضور ---
    set attendance(value) {
        if (value === "" || value === null || isNaN(value)) {
            throw new Error("يجب إدخال نسبة الحضور ولا يمكن ترك الحقل فارغاً.");
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            throw new Error("خطأ في نسبة الحضور: يجب أن تكون النسبة بين 0 و 100%.");
        }
        this.#attendance = num;
    }
    get attendance() { return this.#attendance; }

    // --- حارس الأمان لاسم الطالب ---
    set name(value) {
        if (!value || value.trim() === "") {
            throw new Error("اسم الطالب لا يمكن أن يكون فارغاً.");
        }
        this.#name = value.trim();
    }
    get name() { return this.#name; }

    // --- دالة لحساب متوسط درجات الطالب ---
    calculateAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}

// ==========================================
// 2. إدارة الحالة والتفاعل مع واجهة المستخدم (DOM)
// ==========================================
const studentsList = []; // سلة حفظ الطلاب

// الإمساك بعناصر الصفحة باستخدام getElementById
const nameInput = document.getElementById("studentName");
const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");
const attendanceInput = document.getElementById("attendance");
const addBtn = document.getElementById("addBtn");
const graceBtn = document.getElementById("graceBtn");
const errorBox = document.getElementById("errorBox");
const studentsListContainer = document.getElementById("studentsListContainer");
const graceReportContainer = document.getElementById("graceReportContainer");
const studentCountBadge = document.getElementById("studentCountBadge");

// دالة مساعدة لعرض رسائل الخطأ على الواجهة (داخل صندوق الخطأ الأحمر)
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("d-none");
}

// دالة مساعدة لإخفاء رسائل الخطأ
function hideError() {
    errorBox.textContent = "";
    errorBox.classList.add("d-none");
}

// دالة لتحديث جدول عرض الطلاب على الشاشة
function renderStudentsTable() {
    if (studentsList.length === 0) {
        studentsListContainer.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="fa-solid fa-folder-open fa-3x mb-3 text-secondary opacity-50"></i>
                <p class="m-0">لم يتم إدخال أي بيانات للطلاب حتى الآن.</p>
            </div>`;
        studentCountBadge.textContent = "العدد: 0";
        return;
    }

    studentCountBadge.textContent = `العدد: ${studentsList.length}`;

    let html = `
        <table class="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>اسم الطالب</th>
                    <th>المادة 1</th>
                    <th>المادة 2</th>
                    <th>المادة 3</th>
                    <th>الحضور</th>
                    <th>المتوسط</th>
                </tr>
            </thead>
            <tbody>
    `;

    studentsList.forEach((student, index) => {
        const avg = student.calculateAverage().toFixed(2);
        html += `
            <tr>
                <td>${index + 1}</td>
                <td class="fw-bold">${student.name}</td>
                <td>${student.grade1}</td>
                <td>${student.grade2}</td>
                <td>${student.grade3}</td>
                <td>${student.attendance}%</td>
                <td><span class="badge bg-primary">${avg}</span></td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    studentsListContainer.innerHTML = html;
}

// ==========================================
// 3. زر "إضافة طالب" مع شبكة الأمان (Try / Catch)
// ==========================================
addBtn.addEventListener("click", () => {
    hideError(); // إخفاء أي خطأ قديم

    try {
        // محاولة تخليق كائن جديد وإدخاله في حراس الأمان
        const newStudent = new Student(
            nameInput.value,
            grade1Input.value,
            grade2Input.value,
            grade3Input.value,
            attendanceInput.value
        );

        // إذا نجح الأمر، قم بدفع الكائن إلى المصفوفة
        studentsList.push(newStudent);

        // تحديث جدول الشاشة
        renderStudentsTable();

        // تفريغ حقول الإدخال لتسهيل الإدخال التالي
        nameInput.value = "";
        grade1Input.value = "";
        grade2Input.value = "";
        grade3Input.value = "";
        attendanceInput.value = "";

    } catch (error) {
        // التقاط الخطأ الذي رماه "حارس الأمان" وعرضه للمستخدم على الشاشة
        showError(error.message);
    }
});

// ==========================================
// 4. لجنة الرأفة الآلية (Filter, Map, Reduce)
// ==========================================
graceBtn.addEventListener("click", () => {
    if (studentsList.length === 0) {
        graceReportContainer.innerHTML = `
            <div class="text-center py-3 text-warning">
                <p class="m-0">عفواً، لا توجد سجلات طلاب لتفعيل لجنة الرأفة عليها حالياً.</p>
            </div>`;
        return;
    }

    // 1. Filter: استخراج الطلاب الذين يقع متوسط درجاتهم بين 40 و 49
    const strugglingStudents = studentsList.filter(student => {
        const avg = student.calculateAverage();
        return avg >= 40 && avg < 50;
    });

    if (strugglingStudents.length === 0) {
        graceReportContainer.innerHTML = `
            <div class="alert alert-info bg-dark text-info border-info mb-0">
                <i class="fa-solid fa-circle-info ms-1"></i> لا توجد حالات متعثرة (بين 40 و 49) تستحق لجنة الرأفة حالياً.
            </div>`;
        return;
    }

    // 2. Map: إضافة 5 درجات رأفة لمتوسطات الطلاب المتعثرين وحساب الحالة الجديدة
    const graceProcessed = strugglingStudents.map(student => {
        const oldAvg = student.calculateAverage();
        const newAvg = oldAvg + 5;
        const status = newAvg >= 50 ? "ناجح بعد الرأفة" : "راسب رغم الرأفة";
        return {
            name: student.name,
            oldAverage: oldAvg.toFixed(2),
            newAverage: newAvg > 100 ? 100 : newAvg.toFixed(2),
            status: status
        };
    });

    // 3. Reduce: حساب المتوسط العام بعد الرأفة للطلاب المتعثرين (مع حماية القسمة على صفر)
    const totalNewAverages = graceProcessed.reduce((sum, item) => sum + Number(item.newAverage), 0);
    const overallGraceAverage = (totalNewAverages / graceProcessed.length).toFixed(2);

    // 4. الطباعة على الشاشة باستخدام قوالب النصوص `${}`
    let reportHtml = `
        <div class="mb-3">
            <span class="badge bg-warning text-dark px-3 py-2 fs-6 mb-2">إجمالي عدد الطلاب المتعثرين: ${graceProcessed.length}</span>
            <span class="badge bg-info text-dark px-3 py-2 fs-6 mb-2 ms-2">المتوسط العام للمتعثرين بعد الرأفة: ${overallGraceAverage}</span>
        </div>
        <div class="table-responsive">
            <table class="table table-dark table-striped table-bordered align-middle mb-0">
                <thead>
                    <tr>
                        <th>اسم الطالب</th>
                        <th>المتوسط قبل الرأفة</th>
                        <th>المتوسط بعد الرأفة (+5)</th>
                        <th>القرار الأكاديمي</th>
                    </tr>
                </thead>
                <tbody>
    `;

    graceProcessed.forEach(item => {
        const badgeColor = item.status.includes("ناجح") ? "bg-success" : "bg-danger";
        reportHtml += `
            <tr>
                <td class="fw-bold">${item.name}</td>
                <td>${item.oldAverage}</td>
                <td class="text-warning fw-bold">${item.newAverage}</td>
                <td><span class="badge ${badgeColor}">${item.status}</span></td>
            </tr>
        `;
    });

    reportHtml += `</tbody></table>`;
    graceReportContainer.innerHTML = reportHtml;
});