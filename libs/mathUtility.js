var mUtil = {

	TO_RAD: Math.PI / 180,

	TO_DEG: 1 / (Math.PI / 180),

	vec3angle: function(v1, v2) {
		return Math.acos(Leap.vec3.dot(v1, v2) / (Leap.vec3.length(v1) * Leap.vec3.length(v2))) * this.TO_DEG;
	},

	vec2angle: function(v1, v2) {
		return Math.acos(Leap.glMatrix.vec2.dot(v1, v2) / (Leap.glMatrix.vec2.length(v1) * Leap.glMatrix.vec2.length(v2))) * this.TO_DEG;

	}

}
