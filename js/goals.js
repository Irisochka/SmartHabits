function goalArc(xloc, yloc, value, total, R) {
    var alpha = 360 / total * value,
        a = (270 - alpha) * Math.PI / 180,
        x = xloc + R * Math.cos(a),
        y = yloc - R * Math.sin(a),
        path;

    if (total == value) {
        path = [
            ["M", xloc, yloc - R],
            ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
        ];
    } else {
        path = [
            ["M", xloc, yloc + R],
            ["A", R, R, 0, +(alpha > 180), 1, x, y]
        ];
    }
    return {
        path: path
    };
}

function drawGoalShadow(id, size, color) {
    var halfSize = Math.round(size / 2);

    var paper = Raphael(id, size, size);

    paper.customAttributes.arc = goalArc;

    paper.path().attr({
        "stroke": color,
        "stroke-width": 3,
        arc: [halfSize, halfSize, 100, 100, 86]
    });
}

function drawGoal(id, size, percentage, mainColor, shadowColor) {
    var halfSize = Math.round(size / 2);
    var timeline = new TimelineMax();
    var progress = {percentage: 0};

    var paper = Raphael(id, size, size);

    function draw() {
        paper.clear();

        paper.path().attr({
            "stroke": mainColor,
            "stroke-width": 15,
            arc: [halfSize, halfSize, progress.percentage, 100, 80]
        });
    }

    paper.customAttributes.arc = goalArc;

    timeline.to(progress, 2, {percentage: percentage, onUpdate: draw});

    drawGoalShadow(id, size, shadowColor);
}
